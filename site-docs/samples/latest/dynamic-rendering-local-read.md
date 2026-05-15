# Dynamic Rendering local read

## Metadata

- **Component**: samples
- **Version**: latest
- **URL**: /samples/latest/samples/extensions/dynamic_rendering_local_read/README.html

## Table of Contents

- [Overview](#_overview)
- [Toggling between dynamic rendering and renderpasses](#_toggling_between_dynamic_rendering_and_renderpasses)
- [Toggling_between_dynamic_rendering_and_renderpasses](#_toggling_between_dynamic_rendering_and_renderpasses)
- [Comparison](#_comparison)
- [The sample](#_the_sample)
- [Replacing subpasses for local reads](#_replacing_subpasses_for_local_reads)
- [Replacing_subpasses_for_local_reads](#_replacing_subpasses_for_local_reads)
- [Input attachments](#_input_attachments)
- [Self-Dependencies](#_self_dependencies)
- [Renderpasses with subpasses](#_renderpasses_with_subpasses)
- [Renderpasses_with_subpasses](#_renderpasses_with_subpasses)
- [Dynamic render with local read](#_dynamic_render_with_local_read)
- [Dynamic_render_with_local_read](#_dynamic_render_with_local_read)
- [Understanding the location mapping with an example](#_understanding_the_location_mapping_with_an_example)
- [Understanding_the_location_mapping_with_an_example](#_understanding_the_location_mapping_with_an_example)
- [Conclusion](#_conclusion)
- [Additional information](#_additional_information)

## Content

|  | The source for this sample can be found in the [Khronos Vulkan samples github repository](https://github.com/KhronosGroup/Vulkan-Samples/tree/main/samples/extensions/dynamic_rendering_local_read). |
| --- | --- |

![Sample](../../../_images/samples/extensions/dynamic_rendering_local_read/images/sample.png)

This sample demonstrates how to use the `VK_KHR_dynamic_rendering_local_read` extension in conjunction with the `VK_KHR_dynamic_rendering` extension. This combination can replace core render and subpasses, making it possible to do local reads via input attachments with dynamic rendering.

To make it easy to compare the two different approaches of using either dynamic rendering + local reads or renderpasses + subpasses, this sample has code for both rendering paths.

A define in `dynamic_rendering_local_read.h` can be used to toggle between the two techniques:

#define USE_DYNAMIC_RENDERING

This is enabled by default, making the sample use dynamic rendering with local reads. If you want to use renderpass + subpasses instead, comment this define out and compile the sample.

For a primer on the differences between renderpasses and dynamic rendering, see the readme of the [dynamic rendering sample](../dynamic_rendering/README.html).

Here is the comparison table from that example extended with the newly added features from `VK_KHR_dynamic_rendering_local_read` in **bold**:

| Vulkan 1.0 | Dynamic Rendering |
| --- | --- |
| Rendering begins with `vkCmdBeginRenderPass` | Rendering begins with `vkCmdBeginRenderingKHR` |
| Rendering struct is `VkRenderPassBeginInfo` | Rendering struct is `VkRenderingInfoKHR` |
| Attachments are referenced by `VkFramebuffer` | Attachments are referenced by `VkRenderingAttachmentInfoKHR` |
| `VkFramebuffer` objects are heap-allocated and opaque | `VkRenderingAttachmentInfoKHR` objects are stack-allocated |
| Graphics pipeline creation references a `VkRenderPass` | Graphics pipeline creation references a `VkPipelineRenderingCreateInfoKHR` |
| **Subpasses are advanced with `vkCmdNextSubpass`** | **`VkImageMemoryBarrier` to `VK_IMAGE_LAYOUT_RENDERING_LOCAL_READ_KHR` image layout** |
| **Local reads in shaders use `subpassLoad`** | **Local reads in shaders use `subpassLoad`** |

With subpasses it’s possible to do pixel local reads within a single renderpass. Local read means that you can’t freely sample (like with a texture + sampler) but are instead limited to reading the pixel value from the previous subpass at the exact same position. This is based on how esp. tile based GPU architectures work. On such architectures workloads that don’t need to sample arbitrarily can improve performance using subpasses and pixel local reads using input attachments. One such example  is a deferred renderer with a composition pass. First multiple attachments are filled with different information (albedo, normals, world space position) and then at a later point those attachments are combined into a single image. This composition step reads those attachments at the exact same position that the current pass is operating on, so instead of sampling from these we can use them as input attachments instead and do only pixel local reads.

The rendering setup for this sample looks like this:

![Deferred setup describing subpasses](../../../_images/samples/extensions/dynamic_rendering_local_read/images/deferred_setup.png)

A big criticism with renderpasses was how involved esp. the setup is. Getting renderpasses and subpasses incl. dependencies correct can be tricky and renderpasses are kinda hard to integrate into a dynamically changing setup, making them a hard fit for complex Vulkan projects like game engines. With dynamic rendering, setup is far less involved and moves mostly to command buffer creation. If you look at the sample you can easily spot how much code required by looking at the parts that are deactivated via the `dynamic_rendering_local_read` C++ define. More on this can be found in the [dynamic rendering sample](../dynamic_rendering/README.html) readme. For this sample we’ll only look at draw time.

Just like local reads in subpasses, dynamic rendering local read also makes use of input attachments. That should make it easy to convert existing code to this new extension. So unless you do advanced things like input attachment reordering, the changes required to add pixel local reads to dynamic rendering are minimal and only affect the application side. There are no changes to the shader interface, so shaders that have been used with renderpasses + subpasses can be used without any changes. Even with dynamic rendering and local reads you use `subpassInput` and `subpassLoad`.

With the `dynamicRenderingLocalReads` feature enabled, it’s now possible to use pipeline barriers within dynamic rendering if they include the `VK_DEPENDENCY_BY_REGION_BIT`. Such a barrier makes attachments before the barrier readable as input attachments afterwards. The extension also introduces the new image layout `VK_IMAGE_LAYOUT_RENDERING_LOCAL_READ_KHR` that can be used for storage images and attachments to make writes to those visible via input attachments.

Start a new renderpass with `vkCmdBeginRenderPass` (this also starts the first subpass)

Fill G-Buffer attachments

Start the second subpass with `vkCmdNextSubpass`

Combine G-Buffer attachments using input attachments (and draw to screen using a full-screen quad)

Start the third subpass with `vkCmdNextSubpass`

Draw transparent geometry with a forward pass reading depth from an attachment

End renderpass with `vkCmdEndRenderPass`

Start dynamic rendering with `vkCmdBeginRenderingKHR`

Fill G-Buffer attachments

Insert a memory barrier with the "by region" bit set to make attachment writes visible for input attachment reads for the next draw call

Combine G-Buffer attachments using input attachments (and draw to screen using a full-screen quad)

Draw transparent geometry with a forward pass reading depth from an attachment

End dynamic rendering with `vkCmdEndRenderingKHR`

To help better grasp idea of location remapping, let’s use the following simple fragment shader

layout(location=0) out vec4 A;
layout(location=1) out vec4 B;
layout(location=2) out vec4 C;

Now if we set our `VkRenderingAttachmentLocationInfo::pColorAttachment` to be `[1, 2, 0]`

* 
Writes to `A` write to `VkRenderingInfo::pColorAttachments[2]`

* 
Writes to `B` write to `VkRenderingInfo::pColorAttachments[0]`

* 
Writes to `C` write to `VkRenderingInfo::pColorAttachments[1]`

But if we set our `VkRenderingAttachmentLocationInfo::pColorAttachment` to be only `[1, 2]`

Any writes to `A` will be discarded.

With the addition of `VK_KHR_dynamic_rendering_local_read` it’s now finally possible to fully replace renderpasses, including those that have multiple subpasses. This makes dynamic rendering a fully fledged replacement for renderpasses on all implementations, including tile based architectures.

* 
[Extension proposal](https://docs.vulkan.org/features/latest/features/proposals/VK_KHR_dynamic_rendering_local_read.html)

* 
[Extension blog post](https://www.khronos.org/blog/streamlining-subpasses)
