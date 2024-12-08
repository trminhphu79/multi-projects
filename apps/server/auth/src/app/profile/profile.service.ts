import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  UpdateProfileDto,
  SearchFriendDto,
  AddFriendDto,
} from '@server/shared/dtos/profile';
import { Profile } from '@server/shared/entity/profile';
import { from, map } from 'rxjs';
import { Op } from 'sequelize';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile)
    private model: typeof Profile
  ) {}

  updateOne(payload: UpdateProfileDto) {
    const payloadUpdate = { ...payload };
    delete payloadUpdate.id;
    return from(
      this.model.update(payloadUpdate, { where: { id: payload.id } })
    );
  }

  async addFriend(payload: AddFriendDto) {
    const { profileId, friendId } = payload;

    // Check if profile exists
    const profile = await this.model.findByPk(profileId, {
      include: { model: this.model, as: 'friends' }, // Include existing friends
    });
    if (!profile) {
      throw new NotFoundException(`Profile with id ${profileId} not found`);
    }

    // Check if friend exists
    const friend = await this.model.findByPk(friendId);
    if (!friend) {
      throw new NotFoundException(`Profile with id ${friendId} not found`);
    }

    // Check if the friend relationship already exists
    const isAlreadyFriend = profile.friends.some(
      (existingFriend) => existingFriend.id === friendId
    );
    if (isAlreadyFriend) {
      throw new BadRequestException(
        `Profile with id ${friendId} is already a friend`
      );
    }

    // Add friend if not already a friend
    return profile.$add('friends', friend);
  }

  searchFriend(payload: SearchFriendDto) {
    const {
      keyword,
      offset = 0,
      limit = 10,
      sortField = 'fullName',
      sortOrder = 'ASC',
    } = payload;
    return from(
      this.model.findAndCountAll({
        where: {
          [Op.or]: [
            {
              fullName: {
                [Op.iLike]: `%${keyword}%`, // Case-insensitive partial match
              },
            },
            {
              bio: {
                [Op.iLike]: `%${keyword}%`,
              },
            },
          ],
        },
        offset,
        limit,
        order: [[sortField, sortOrder]], // Dynamic sorting
      })
    ).pipe(
      map((result) => ({
        data: result.rows, // List of friends
        totalCount: result.count, // Total number of matching records
        pagination: {
          offset,
          limit,
          currentPage: Math.ceil(offset / limit) + 1,
          totalPages: Math.ceil(result.count / limit),
        },
        message: 'Search completed successfully!',
      }))
    );
  }

  getUserFriends(profileId: number) {
    return from(
      this.model.findOne({
        where: { accountId: profileId },
        include: [
          {
            model: Profile,
            as: 'friends', // Alias defined in the relationship
            through: { attributes: [] }, // Exclude the join table from the result
          },
        ],
      })
    );
  }
}
