# Vulkan Documentation

## Metadata

- **Component**: spec
- **Version**: latest
- **URL**: /spec/latest/index.html

## Table of Contents

- [About](#_about)
- [How to Navigate This Site](#_how_to_navigate_this_site)
- [How_to_Navigate_This_Site](#_how_to_navigate_this_site)
- [What is Included](#_what_is_included)
- [What_is_Included](#_what_is_included)
- [Vulkan Specification](#_vulkan_specification)
- [Vulkan Feature Descriptions](#_vulkan_feature_descriptions)
- [Vulkan_Feature_Descriptions](#_vulkan_feature_descriptions)
- [Vulkan Guide](#_vulkan_guide)
- [Vulkan Samples](#_vulkan_samples)
- [Vulkan Tutorial](#_vulkan_tutorial)
- [GLSL Specification](#_glsl_specification)
- [How to get Started With Vulkan](#_how_to_get_started_with_vulkan)
- [How_to_get_Started_With_Vulkan](#_how_to_get_started_with_vulkan)
- [Requirements](#_requirements)
- [Vulkan SDK](#_vulkan_sdk)
- [First Vulkan Program](#_first_vulkan_program)
- [First_Vulkan_Program](#_first_vulkan_program)
- [Getting Help](#_getting_help)
- [Feedback](#_feedback)

## Content

Welcome to the official Documentation site for the cross-platform Vulkan
graphics and compute API.
This is your starting point for all things related to
[Vulkan](https://www.vulkan.org).
This site gathers together several key Vulkan documents into a convenient
single site.This allows searching and cross-linking across documents, to
help navigate quickly to the information you need for developing
Vulkan-based applications.

This build of the site includes the Vulkan 1.4.346 API specification
(with all registered extensions), generated on 2026-03-13 11:23:36Z from git branch: main commit: b71f0036e3f00fa0cda4d888a53f6081c62b4648.

The site is organized into “components”.
The left navigation sidebar links to pages in the current component.
The bottom-left button switches between components.

The top navigation also has links to all components and related external
documentation.
It also allows for searching within this site.
If the “In this component” box is checked, search will be restricted to
the current component.
Otherwise, all components of the site are searched.

On pages with multiple sections, a right navigation sidebar links to
sections in the current page.

[The Vulkan specification](index.html) describes the Vulkan
Application Programming Interface (API).
Vulkan is a C99 API designed for explicit control of low-level graphics and
compute functionality.

The specification is aimed at implementors of Vulkan and at developers that
already know the basics of Vulkan and want to read up on more advanced
topics.

[The Vulkan feature descriptions](../../features/latest/features/index.html) include extension
documents that are written outlining the proposed API for new extensions.
They are the base for the final extension specification and contain
supplementary documentation.

It is closely related to the Vulkan specification and can help to understand
why an extension or a feature has been implemented in a given way.

[The Vulkan Guide](../../guide/latest/index.html) is designed to help developers get
up and going with the world of Vulkan.
It is aimed to be a light read that leads to many other useful links
depending on what a developer is looking for.
All information is intended to help better fill the gaps about the many
nuances of the Vulkan ecosystem including peripheral topics like shading
languages.

The Guide is a good starting point for first time Vulkan developers.

[The Vulkan Samples](../../samples/latest/README.html) are a collection of resources
to help you develop optimized Vulkan applications.
These C++ samples demonstrate a wide range of Vulkan’s functionality.
From writing a first "Hello triangle" sample to rendering complex scenes,
doing GPU based work and using hardware accelerated ray tracing, these
samples are trying to help developers learn how to use Vulkan.

[The Vulkan tutorial](../../tutorial/latest/00_Introduction.html) will teach you the
basics of using Vulkan.
It will help you get started with the API and teaches you how to get your
first graphics and compute programs up and running using the C++ programming
language.

The Tutorial is aimed at people starting with Vulkan.
If you are new to Vulkan, this should be your starting point.

Although Vulkan consumes shaders in SPIR-V, one of the most widely used
shading languages is [GLSL](../../glsl/latest/index.html).
This part of the documentation site contains the GLSL shading language
specification with Vulkan specific extensions.

Vulkan is a available on a [wide range of
platforms](../../guide/latest/platforms.html).
To develop with it, you first need an implementation that supports Vulkan.
Most systems nowadays support Vulkan out of the box, as support ships via
graphics cards drivers.

For actually writing code that uses Vulkan, you need bindings for your
programming language like the
[C bindings](https://github.com/KhronosGroup/Vulkan-Headers) (that also work
with C++) or the [C++ bindings](https://github.com/KhronosGroup/Vulkan-Hpp)
that offers a C++ based interface to the API.

While not a requirement for developing Vulkan application, the
[LunarG Vulkan SDK](https://www.lunarg.com/vulkan-sdk/) is a convenient
package of components and tools to help with developing Vulkan applications.
Using the SDK is recommended.

The
[Vulkan
SDK](https://vulkan.lunarg.com/doc/sdk/1.4.309.0/windows/getting_started.html) contains C and C++ project templates for Microsoft Visual Studio that
can be used as a starting point for writing Vulkan programs.

Another option is to follow the
[development environment
chapter](../../tutorial/latest/02_Development_environment.html) of the [The Vulkan tutorial](../../tutorial/latest/00_Introduction.html)
which has instructions for different platforms.

As a third option, the [The Vulkan Samples](../../samples/latest/README.html) come
with build system that supports different platforms and C++ based
development environments.

The Vulkan communities are there to help with all questions regarding the
Vulkan ecosystem.
Official channels include [Discord](https://discord.gg/vulkan),
[Reddit](https://www.reddit.com/r/vulkan/) and a
[Vulkan forum](https://community.khronos.org/c/vulkan).

If you need to report a problem or want to build the site yourself, start
with the [Vulkan-Site](https://github.com/KhronosGroup/Vulkan-Site/)
repository on GitHub.

This site is generated using the [Antora](https://docs.antora.org/)
static site generator.
