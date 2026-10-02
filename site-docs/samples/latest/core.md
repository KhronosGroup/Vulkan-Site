# Core

## Metadata

- **Component**: samples
- **Version**: latest
- **URL**: /samples/latest/components/core/README.html

## Table of Contents

- [Platform](#_platform)
- [Utilities](#_utilities)

## Content

Core is a collection of pure interfaces or small utilities which are used across the project.
The core component is the only component which does not follow the component pattern in its entirety.
The only major difference between core and other components is the header prefix used is `core/` instead of `components/core/`.

A Platform is the name we have given to the physical hardware and operating system that the project is executing on.
We support multiple platforms which can be identified by the following defines

* 
`PLATFORM__ANDROID`

* 
`PLATFORM__WINDOWS`

* 
`PLATFORM__LINUX_D2D`

* 
`PLATFORM__LINUX`

* 
`PLATFORM__MACOS`

Using these platforms should be as transparent as possible to a sample.
Components on the other hand may add platform specific code paths if required.

An application can create a cross platform entrypoint by using the `CUSTOM_MAIN(context_name)` macro

#include 

CUSTOM_MAIN(context)
{
    context.arguments();
    context.external_storage_directory();
    context.temp_directory();

    // Components using platform specific contexts
    FileSystem fs = FileSystem::from_context(context);
}

* 
Error - A collection of error handling macros

* 
Hash - A collection of hashing functions

* 
Strings - A collection of string utilities
