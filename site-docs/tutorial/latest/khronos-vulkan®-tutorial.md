# Khronos Vulkan® Tutorial

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/00_Introduction.html

## Table of Contents

- [Attribution](#_attribution)
- [Differences](#_differences)
- [About](#_about)
- [License](#_license)
- [Tutorial structure](#_tutorial_structure)

## Content

The Khronos Vulkan® Tutorial is based on the "[Vulkan Tutorial](https://vulkan-tutorial.com/)" by Alexander Overvoorde licensed under
[CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).

Compared to the original tutorial, this version of the tutorial is teaching up-to-date concepts:

* 
Vulkan 1.4 as a baseline

* 
Dynamic rendering instead of render passes

* 
Timeline semaphores

* 
[Slang](https://shader-slang.org/) as the primary shading language

* 
Modern C++ (20) with modules

* 
[Vulkan-Hpp](https://github.com/KhronosGroup/Vulkan-Hpp) with [RAII](https://en.wikipedia.org/wiki/Resource_acquisition_is_initialization)

It also contains Vulkan usage clarifications, improved synchronization and new content.

This tutorial will teach you the basics of using the
[Vulkan](https://www.khronos.org/vulkan/) graphics and compute API.
Vulkan is an API by the [Khronos group](https://www.khronos.org/) that
provides a much better abstraction of modern graphics cards.
This new interface allows you to better describe what your application
intends to do, which can lead to better performance and less surprising
driver behavior compared to existing APIs like
[OpenGL](https://en.wikipedia.org/wiki/OpenGL) and
[Direct3D](https://en.wikipedia.org/wiki/Direct3D).
The ideas behind Vulkan are similar to those of
[Direct3D 12](https://en.wikipedia.org/wiki/Direct3D#Direct3D_12) and
[Metal](https://en.wikipedia.org/wiki/Metal_(API)), but Vulkan has the
advantage of being fully cross-platform and allows you to develop for
Windows, Linux and Android at the same time.

However, the price you pay for these benefits is that you have to work with
a significantly more verbose and nuanced API. Every detail related to the
graphics API needs to be set up by your application, including initial frame
 buffer creation and memory management for objects like buffers and texture
 images. The graphics driver will do a lot less hand holding, which means
 that you will have to do more work in your application to ensure correct behavior.

Where possible, we do take advantage of modern tools to make this easier in
this tutorial to work with and learn Vulkan; however, Vulkan isn’t meant to be
easy.

The takeaway message here is that Vulkan is not for everyone.
It is targeted at programmers who are enthusiastic about high performance
computer graphics and are willing to put some work in.
If you are more interested in game development, rather than computer
graphics, then you may wish to stick to OpenGL or Direct3D, which will not
be deprecated in favor of Vulkan anytime soon. However, understanding the
sacrifice of staying in OpenGL is that API will never get the
 latest features like Ray Tracing or AI.  OpenGL is in maintenance, Vulkan is
  where research and new features are available.
Another alternative is to use an engine like
[Unreal Engine](https://en.wikipedia.org/wiki/Unreal_Engine#Unreal_Engine_4) or
[Unity](https://en.wikipedia.org/wiki/Unity_(game_engine)), which will be able
 to use Vulkan while exposing a much higher level API to you.

With that out of the way, let’s cover some prerequisites for the following
this tutorial:

* 
A device and driver compatible with Vulkan

Most GPU vendors support Vulkan in their consumer drivers or, for mobile,
 on their devices.
For macOS and iOS, Vulkan support is available through
[MoltenVK](https://github.com/KhronosGroup/MoltenVK).
You can look up Vulkan support in detail at the community driven
[Vulkan Hardware Database](https://vulkan.gpuinfo.org/).

Experience with C++

* 
Familiarity with RAII, initializer lists

A compiler with decent support of C++20 features

* 
Visual Studio 2017+, GCC 7+, or Clang 5+

Some existing experience with realtime 3D computer graphics

* 
E.g., OpenGL or Direct3D

This tutorial will not assume knowledge of OpenGL or Direct3D concepts, but
 it does require you to know the basics of 3D computer graphics.
It will not explain the math behind perspective projection, for example.
See [this online book](https://paroj.github.io/gltut/) for a great
 introduction of computer graphics concepts.
Some other great computer graphics resources are:

* 
[Ray tracing in one weekend](https://github.com/RayTracing/raytracing.github.io)

* 
[Physically Based Rendering book](https://www.pbr-book.org/)

You can use C instead of C++ if you want, but you will have to use a
different linear algebra library, and you will be on your own in terms of
  code structuring.
We will use C++ features like classes and RAII to organize logic and
 resource lifetimes.

To make it easier to learn to work with Vulkan, we’ll be using the newer
[Vulkan-Hpp](https://github.com/KhronosGroup/Vulkan-Hpp) bindings that
  abstract some of the dirty work and help prevent certain classes of errors.
We’ll also use Vulkan RAII and, optionally, the Vulkan C++20 module. The
attachments template has modules disabled by default for maximum compatibility,
but we recommend enabling them if your toolchain supports it. With this
combination, we show how to use Vulkan in a way that translates directly into
large projects where C++ libraries have traditionally caused long build times,
while also showing one method of making Vulkan a joy to work with.

The contents of this repository are licensed as [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/), unless stated otherwise.
By contributing to this repository, you agree to license your contributions to the public under that same license.

We’ll start with an overview of how Vulkan works and the work we’ll have to
 do to get the first triangle on the screen.
The purpose of all the smaller steps will make more sense after you’ve
 understood their basic role in the whole picture.
Next, we’ll set up the development environment with the
[Vulkan SDK](https://lunarg.com/vulkan-sdk/), the
[GLM library](https://glm.g-truc.net/) for
  linear algebra operations and [GLFW](https://www.glfw.org/) for window creation.
The tutorial will cover how to set these up on Windows with Visual Studio,
 and on Ubuntu Linux with GCC.

After that, we’ll implement all the basic components of a Vulkan program
that are necessary to render your first triangle.
Each chapter will follow roughly the following structure:

* 
Introduce a new concept and its purpose

* 
Use all the relevant API calls to integrate it into your program

* 
Abstract parts of it into helper functions

Although each chapter is written as a follow-up on the previous one, it is
also possible to read the chapters as standalone articles introducing a
certain Vulkan feature.
That means that the site is also useful as a reference.
All the Vulkan functions and types are linked to the specification, so you
can click them to learn more.
You are encouraged to submit feedback to [this Khronos repository](https://github.com/KhronosGroup/Vulkan-Docs).

As mentioned before, the Vulkan API has a rather verbose API with many
parameters to give you maximum control over the graphics hardware.
This causes basic operations like creating a texture to take a lot of steps
that have to be repeated every time.
Therefore, we’ll be creating our own collection of helper functions
throughout the tutorial.

Every chapter will also conclude with a link to the full code listing up to
that point. You can refer to it if you have any doubts about the structure of
 the code, or if you’re dealing with a bug and want to compare.
All the code files have been tested on graphics cards from multiple vendors
to verify correctness.

If you have any type of question or feedback on the tutorial and site itself, then
please don’t hesitate to submit an issue or pull request to the
[GitHub repository](https://github.com/KhronosGroup/Vulkan-Tutorial).
You can watch the repository to be notified of updates to the tutorial.

After you’ve gone through the ritual of drawing your very first Vulkan
powered triangle onscreen, we’ll start expanding the program to include
linear transformations, textures and 3D models.

If you’ve played with graphics APIs before, then you’ll know that there can
be a lot of steps until the first geometry shows up on the screen.
There are many of these initial steps in Vulkan, but you’ll see that each of
 the individual steps is easy to understand and does not feel redundant.
It’s also important to keep in mind that once you have that boring looking
triangle, drawing fully textured 3D models does not take that much extra
work, and each step beyond that point is much more rewarding.

If you encounter any problems while following the tutorial, then first check
 the FAQ to see if your problem and its solution is already listed there.
If you are still stuck after that, then feel free to ask for help in the
[GitHub repository](https://github.com/KhronosGroup/Vulkan-Tutorial).

Ready to dive into the future of high performance graphics APIs?
[Let’s go!](01_Overview.html)
