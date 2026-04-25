# OpenGL interoperability

## Metadata

- **Component**: samples
- **Version**: latest
- **URL**: /samples/latest/samples/extensions/open_gl_interop/README.html

## Content

|  | The source for this sample can be found in the [Khronos Vulkan samples github repository](https://github.com/KhronosGroup/Vulkan-Samples/tree/main/samples/extensions/open_gl_interop). |
| --- | --- |

**Extensions**: [`VK_KHR_external_memory`](https://www.khronos.org/registry/vulkan/specs/latest/man/html/VK_KHR_external_memory.html), [`VK_KHR_external_semaphore`](https://www.khronos.org/registry/vulkan/specs/latest/man/html/VK_KHR_external_semaphore.html)

Render a procedural image using OpenGL and incorporate that rendered content into a Vulkan scene.
Demonstrates using the same backing memory for a texture in both OpenGL and Vulkan and how to synchronize the APIs using shared semaphores and barriers.
