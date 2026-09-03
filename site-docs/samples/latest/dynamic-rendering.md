# Dynamic Rendering

## Metadata

- **Component**: samples
- **Version**: latest
- **URL**: /samples/latest/samples/extensions/dynamic_rendering/README.html

## Table of Contents

- [Overview](#_overview)
- [Rendering Attachments](#_rendering_attachments)
- [Pipelines](#_pipelines)
- [Enabling the Extension](#_enabling_the_extension)
- [Enabling_the_Extension](#_enabling_the_extension)

## Content

|  | The source for this sample can be found in the [Khronos Vulkan samples github repository](https://github.com/KhronosGroup/Vulkan-Samples/tree/main/samples/extensions/dynamic_rendering). |
| --- | --- |

This sample demonstrates how to use the `VK_KHR_dynamic_rendering` extension, which eliminates the need to create render passes and improves flexibility while developing render pipelines.

This extension changes how rendering resources are managed.
Rather than using render pass objects, this extension allows the developer to directly reference rendering attachments prior to the start of rendering.

Below is a comparison of the common Vulkan render pass construction and dynamic rendering.

| Vulkan 1.0 | Dynamic Rendering |
| --- | --- |
| Rendering begins with `vkCmdBeginRenderPass` | Rendering begins with `vkCmdBeginRenderingKHR` |
| Rendering struct is `VkRenderPassBeginInfo` | Rendering struct is `VkRenderingInfoKHR` |
| Attachments are referenced by `VkFramebuffer` | Attachments are referenced by `VkRenderingAttachmentInfoKHR` |
| `VkFramebuffer` objects are heap-allocated and opaque | `VkRenderingAttachmentInfoKHR` objects are stack-allocated |
| Graphics pipeline creation references a `VkRenderPass` | Graphics pipeline creation references a `VkPipelineRenderingCreateInfoKHR` |
|  |  |

More detail is provided in the sections that follow.

Previously, developers had to create render passes and framebuffers, which would be referenced in `VkRenderPassBeginInfo`.
This is illustrated in the non-dynamic version of the command buffer construction sample code:

VkRenderPassBeginInfo render_pass_begin_info    = vkb::initializers::render_pass_begin_info();
render_pass_begin_info.renderPass               = render_pass;
render_pass_begin_info.framebuffer              = framebuffers[i];
render_pass_begin_info.renderArea.extent.width  = width;
render_pass_begin_info.renderArea.extent.height = height;
render_pass_begin_info.clearValueCount          = 3;
render_pass_begin_info.pClearValues             = clear_values.data();

vkCmdBeginRenderPass(draw_cmd_buffer, &render_pass_begin_info, VK_SUBPASS_CONTENTS_INLINE);

draw_scene();

vkCmdEndRenderPass(draw_cmd_buffer);

However, with dynamic rendering, the render pass and framebuffer structs are replaced by `VkRenderingAttachmentInfoKHR`, which contains information about color, depth, and stencil attachments, and `VkRenderingInfoKHR`, which references the attachments.
These structs are used at the start of rendering with the new command `vkCmdBeginRenderingKHR`, as shown in the dynamic version of the command buffer construction sample code:

VkRenderingAttachmentInfoKHR color_attachment_info = vkb::initializers::rendering_attachment_info();
color_attachment_info.imageView                    = swapchain_buffers[i].view;        // color_attachment.image_view;
...

VkRenderingAttachmentInfoKHR depth_attachment_info = vkb::initializers::rendering_attachment_info();
depth_attachment_info.imageView                    = depth_stencil.view;
...

auto render_area               = VkRect2D{VkOffset2D{}, VkExtent2D{width, height}};
auto render_info               = vkb::initializers::rendering_info(render_area, 1, &color_attachment_info);
render_info.layerCount         = 1;
render_info.pDepthAttachment   = &depth_attachment_info;
render_info.pStencilAttachment = &depth_attachment_info;

vkCmdBeginRenderingKHR(draw_cmd_buffer, &render_info);
draw_scene();
vkCmdEndRenderingKHR(draw_cmd_buffer);

Dynamic rendering changes how graphics pipelines are created.
Whereas before, the `VkGraphicsPipelineCreateInfo` struct was required to reference a non-null pointer to a `VkRenderPass` object, the dynamic rendering information is instead contained in a `VkPipelineRenderingCreateInfoKHR` struct referenced by `pNext` of the graphics pipeline create info:

// Provide information for dynamic rendering
VkPipelineRenderingCreateInfoKHR pipeline_create{VK_STRUCTURE_TYPE_PIPELINE_RENDERING_CREATE_INFO_KHR};
pipeline_create.pNext                   = VK_NULL_HANDLE;
pipeline_create.colorAttachmentCount    = 1;
pipeline_create.pColorAttachmentFormats = &color_rendering_format;
pipeline_create.depthAttachmentFormat   = depth_format;
pipeline_create.stencilAttachmentFormat = depth_format;

// Use the pNext to point to the rendering create struct
VkGraphicsPipelineCreateInfo graphics_create{VK_STRUCTURE_TYPE_GRAPHICS_PIPELINE_CREATE_INFO};
graphics_create.pNext               = &pipeline_create; // reference the new dynamic structure
graphics_create.renderPass          = VK_NULL_HANDLE; // previously required non-null

During graphics pipeline construction, the `VkPipelineRenderingCreateInfoKHR` structure does not contain pointers to the actual attachment images (as the pointers aren’t required until `VkRenderingAttachmentInfoKHR`);
instead, only the number and format of the attachments are required.

The dynamic rendering api is provided in Vulkan 1.2.197 and the appropriate headers / SDK is required.

In addition, since dynamic rendering is provided as an extension and may have varying levels of support, the developer must query availability for each device used.

The device extension is provided by `VK_KHR_DYNAMIC_RENDERING_EXTENSION_NAME`, and additional features are provided by the `VkPhysicalDeviceDynamicRenderingFeaturesKHR` struct:

typedef struct VkPhysicalDeviceDynamicRenderingFeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           dynamicRendering;
} VkPhysicalDeviceDynamicRenderingFeaturesKHR;

In addition to enabling the extension, developers may need to dynamically query the function pointers for `vkCmdBeginRenderingKHR` and `vkCmdEndRenderingKHR` if the preprocessor macro `VK_NO_PROTOTYPES` is enabled.
This can be achieved through `vkGetInstanceProcAddr`:

VkInstance instance = get_device().get_gpu().get_instance().get_handle();
assert(!!instance);
vkCmdBeginRenderingKHR = (PFN_vkCmdBeginRenderingKHR) vkGetInstanceProcAddr(instance, "vkCmdBeginRenderingKHR");
vkCmdEndRenderingKHR   = (PFN_vkCmdEndRenderingKHR) vkGetInstanceProcAddr(instance, "vkCmdEndRenderingKHR");
if (!vkCmdBeginRenderingKHR || !vkCmdEndRenderingKHR)
{
    throw std::runtime_error("Unable to dynamically load vkCmdBeginRenderingKHR and vkCmdEndRenderingKHR");
}
