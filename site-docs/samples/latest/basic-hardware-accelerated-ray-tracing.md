# Basic hardware accelerated ray tracing

## Metadata

- **Component**: samples
- **Version**: latest
- **URL**: /samples/latest/samples/extensions/ray_tracing_basic/README.html

## Content

|  | The source for this sample can be found in the [Khronos Vulkan samples github repository](https://github.com/KhronosGroup/Vulkan-Samples/tree/main/samples/extensions/ray_tracing_basic). |
| --- | --- |

**Extensions**: [`VK_KHR_ray_tracing_pipeline`](https://www.khronos.org/registry/vulkan/specs/latest/html/vkspec.html#VK_KHR_ray_tracing_pipeline), [`VK_KHR_acceleration_structure`](https://www.khronos.org/registry/vulkan/specs/latest/html/vkspec.html#VK_KHR_acceleration_structure)

Render a basic scene using the official cross-vendor ray tracing extension.
Shows how to setup all data structures required for ray tracing, including the bottom and top level acceleration structures for the geometry, the shader binding table and the ray tracing pipelines with shader groups for ray generation, ray hits, and ray misses.
After dispatching the rays, the final result is copied to the swapchain image.
