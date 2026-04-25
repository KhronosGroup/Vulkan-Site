# What is Vulkan?

## Metadata

- **Component**: guide
- **Version**: latest
- **URL**: /guide/latest/what_is_vulkan.html

## Table of Contents

- [Vulkan at its core](#_vulkan_at_its_core)
- [Vulkan_at_its_core](#_vulkan_at_its_core)
- [Vulkan and OpenGL](#_vulkan_and_opengl)
- [Vulkan_and_OpenGL](#_vulkan_and_opengl)
- [Using helping libraries](#_using_helping_libraries)
- [Using_helping_libraries](#_using_helping_libraries)
- [Learning to use Vulkan](#_learning_to_use_vulkan)
- [Learning_to_use_Vulkan](#_learning_to_use_vulkan)

## Content

|  | Vulkan is a new generation graphics and compute API that provides high-efficiency, cross-platform access to modern GPUs used in a wide variety of devices from PCs and consoles to mobile phones and embedded platforms. |
| --- | --- |

Vulkan is not a company, nor language, but rather a way for developers to program their modern GPU hardware in a cross-platform and cross-vendor fashion. The Khronos Group is a member-driven consortium that created and maintains Vulkan.

At the core, Vulkan is an [API Specification](https://registry.khronos.org/vulkan/#apispecs) that conformant hardware implementations follow. The public specification is generated from the [./xml/vk.xml](https://github.com/KhronosGroup/Vulkan-Docs/blob/main/xml/vk.xml) Vulkan Registry file in the official public copy of the Vulkan Specification repo found at [Vulkan-Doc](https://github.com/KhronosGroup/Vulkan-Docs). Documentation of the [XML schema](https://registry.khronos.org/vulkan/specs/latest/registry.html) is also available.

The Khronos Group, along with the Vulkan Specification, releases [C99](https://www.open-std.org/jtc1/sc22/wg14/www/standards) [header files](https://github.com/KhronosGroup/Vulkan-Headers/tree/main/include/vulkan) generated from the [API Registry](https://registry.khronos.org/vulkan/#apiregistry) that developers can use to interface with the Vulkan API.

For those who might not work with C code, there are various language bindings out there.

Some developers might be aware of the other Khronos Group standard [OpenGL](https://www.khronos.org/opengl/) which is also a 3D Graphics API. Vulkan is not a direct replacement for OpenGL, but rather an explicit API that allows for more explicit control of the GPU.

Khronos' [Vulkan Samples](https://github.com/KhronosGroup/Vulkan-Samples) article on ["How does Vulkan compare to OpenGL ES? What should you expect when targeting Vulkan?](https://github.com/KhronosGroup/Vulkan-Samples/blob/master/samples/vulkan_basics.adoc) offers a more detailed comparison between the two APIs.

![what_is_vulkan_compared_to_gl.png](_images/what_is_vulkan_compared_to_gl.png)

Vulkan puts more work and responsibility into the application. Not every developer will want to make that extra investment, but those that do so correctly can find power and performance improvements.

![what_is_vulkan_decision.png](_images/what_is_vulkan_decision.png)

While some developers may want to try using Vulkan with no help, it is common to use some lighter libraries in your development flow to help abstract some of the more tedious aspect of Vulkan. Here are some [libraries](https://github.com/KhronosGroup/Khronosdotorg/blob/main/api/vulkan/resources.md#libraries) to [help with development](https://github.com/vinjn/awesome-vulkan#libraries)

![what_is_vulkan_layer](_images/what_is_vulkan_layer.png)

Vulkan is a tool for developers to create hardware accelerated applications. The Vulkan Guide tries to cover the more logistical material such as extensions, versions, spec, etc. For more information how to “use” Vulkan to create something such as the Hello World Triangle, please take a look at resources such as those found in [Khronos' Vulkan “learn” page](https://www.vulkan.org/learn). If you want to get more hands-on help and knowledge, feel free to join the [Khronos Developer Slack](https://khr.io/slack) or the [Khronos Community Forums](https://community.khronos.org/) as well!
