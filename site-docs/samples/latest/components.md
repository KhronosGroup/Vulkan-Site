# Components

## Metadata

- **Component**: samples
- **Version**: latest
- **URL**: /samples/latest/components/README.html

## Table of Contents

- [Core Component](#_core_component)
- [Create a new component](#_create_a_new_component)
- [Create_a_new_component](#_create_a_new_component)
- [Add the Component Compile Target](#_add_the_component_compile_target)
- [Add_the_Component_Compile_Target](#_add_the_component_compile_target)
- [Compile Components](#_compile_components)

## Content

A component encapsulates all code relating to a specific goal.
Components act as individual compile targets.
This allows CMake to efficiently parallelize the compilation and link stages.
A component should include the minimum amount of dependencies.
Circular dependencies should be avoided.

Common interfaces can be used across the project and multiple components.
These interfaces are defined in `components/core`.
**Core** is the only component which does not follow the component pattern in its entirety.
The only major difference between core and other components is the header prefix used is `core/` instead of `components/core/`.

See [core documentation](core/README.html) for more information.

To create a new component add a new folder under `components/`.
The folder name should relate to the components implementation - see current components for inspiration.
The next instructs are to be carried out inside the `components/` folder.

Create a directory named `include/components/`.
This contains all public headers which other components will have access too

Create a directory named `src`.
This contains all private headers and source files.
Components will not be able to include these.

Create a directory named `tests`.
This contains all test files for this component

Create a `CMakeLists.txt`

Registering a component adds the `vkb**`* compile target.
This target is also linked as a dependency to `vkb`*`components`.

vkb__register_component(
    NAME 
    SRC
        src/.hpp
        src/.cpp
    LINK_LIBS
        
)

* 
To compile all components run cmake with `--target vkb__components`

* 
To compile a specific component run cmake with `--target vkb__`

* 
To compile all tests run cmake with `--target vkb__tests`

* 
To compile a specific test run cmake with `--target tests__`.
