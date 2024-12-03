## Nx

https://nx.dev/

Nx is a suite of powerful, extensible dev tools to help you architect, test, and build at any scale — integrating seamlessly with modern technologies and libraries while providing a robust CLI, caching, dependency management, and more.

It has first-class support for many frontend and backend technologies, so its documentation comes in multiple flavours.

## Principles

Below is the sample folder structure for Nx with NestJS and Angular. Our principles are:

- SCAMs (single component Angular modules) for tree-shakable components, meaning each component will have a respective module. For example, a `RegisterComponent` will have a corresponding `RegisterModule`, we won't declare `RegisterComponent` as part of `AuthModule` for example.
- Mostly everything will stay in the `libs` folder. New modules, new models, new configurations, new components etc... are in libs. libs should be separated into different directories based on existing apps. We won't put them inside the `apps` folder. For example in an Angular, it contains the `main.ts`, `app.component.ts` and `app.module.ts`

## Structure

```
.
└── root
    ├── apps
    │   ├── api                       <-- nestjs
    │   └── client                    <-- angular
    └── libs (1)
        ├── api                       <-- grouping folder (dir)
        │   ├── core                  <-- grouping folder (dir)
        │   │   └── feature           <-- nest:lib (2)
        │   ├── feature-1             <-- grouping folder (dir)
        │   │   ├── data-access       <-- nest:lib, service + entities
        │   │   ├── feature           <-- nest:lib, module + controller
        │   │   └── utils             <-- nest:lib, things like interceptors, guards, pipes etc...
        │   └── feature-2             <-- grouping folder (dir)
        │       ├── data-access       <-- nest:lib, service + entities
        │       ├── feature           <-- nest:lib, module + controller
        │       └── utils             <-- nest:lib, things like interceptors, guards, pipes etc...
        ├── client                    <-- grouping folder (dir)
        │   ├── shell                 <-- grouping folder (dir) 
        │   │   └── feature           <-- angular:lib (3)
        │   ├── feature-1             <-- grouping folder (dir)
        │   │   ├── data-access       <-- angular:lib, service, API calls, state management)
        │   │   ├── feature           <-- grouping folder (dir) or lib (4)
        │   │   │   ├── list          <-- angular:lib e.g. ProductList
        │   │   │   └── detail        <-- angular:lib e.g. ProductDetail
        │   │   └── ui                <-- grouping folder (dir)
        │   │       ├── comp-1        <-- angular:lib, SCAM for Component
        │   │       └── pipe-1        <-- angular:lib, SCAM for Pipe
        │   └── shared                <-- grouping folder (dir)
        │       ├── data-access       <-- angular:lib, any Service or State management to share across the Client app)
        │       ├── ui                <-- grouping folder (dir) (5)
        │       └── utils             <-- angular:lib, usually shared Guards, Interceptors, Validators...)
        └── shared                    <-- grouping folder (dir), most libs in here are buildable @nrwl/angular:lib)
            ├── data-access           <-- my shared data-access is usually models, so it is a lib
            ├── ui                    <-- optional grouping folder (dir), if I have multiple client apps
            └── utils                 <-- optional grouping folder (dir), usually validation logic or shared utilities
                ├── util1             <-- lib
                └── util2             <-- lib