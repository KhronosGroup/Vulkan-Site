# VkRect2D(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkRect2D.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkRect2D - Structure specifying a two-dimensional subregion

Rectangles are used to describe a specified rectangular region of pixels
within an image or framebuffer.
Rectangles include both an offset and an extent of the same dimensionality,
as described above.
Two-dimensional rectangles are defined by the structure

// Provided by VK_VERSION_1_0
typedef struct VkRect2D {
    VkOffset2D    offset;
    VkExtent2D    extent;
} VkRect2D;

* 
`offset` is a [VkOffset2D](VkOffset2D.html) specifying the rectangle offset.

* 
`extent` is a [VkExtent2D](VkExtent2D.html) specifying the rectangle extent.

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkBindImageMemoryDeviceGroupInfo](VkBindImageMemoryDeviceGroupInfo.html), [VkClearRect](VkClearRect.html), [VkCommandBufferInheritanceRenderPassTransformInfoQCOM](VkCommandBufferInheritanceRenderPassTransformInfoQCOM.html), [VkDeviceGroupRenderPassBeginInfo](VkDeviceGroupRenderPassBeginInfo.html), [VkDisplayPresentInfoKHR](VkDisplayPresentInfoKHR.html), [VkExtent2D](VkExtent2D.html), [VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM](VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM.html), [VkOffset2D](VkOffset2D.html), [VkOpticalFlowExecuteInfoNV](VkOpticalFlowExecuteInfoNV.html), [VkPipelineDiscardRectangleStateCreateInfoEXT](VkPipelineDiscardRectangleStateCreateInfoEXT.html), [VkPipelineViewportExclusiveScissorStateCreateInfoNV](VkPipelineViewportExclusiveScissorStateCreateInfoNV.html), [VkPipelineViewportStateCreateInfo](VkPipelineViewportStateCreateInfo.html), [VkRenderPassBeginInfo](VkRenderPassBeginInfo.html), [VkRenderPassStripeInfoARM](VkRenderPassStripeInfoARM.html), [VkRenderingInfo](VkRenderingInfo.html), [vkCmdSetDiscardRectangleEXT](vkCmdSetDiscardRectangleEXT.html), [vkCmdSetExclusiveScissorNV](vkCmdSetExclusiveScissorNV.html), [vkCmdSetScissor](vkCmdSetScissor.html), [vkCmdSetScissorWithCount](vkCmdSetScissorWithCount.html), [vkCmdSetScissorWithCount](vkCmdSetScissorWithCount.html), [vkGetPhysicalDevicePresentRectanglesKHR](vkGetPhysicalDevicePresentRectanglesKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/fundamentals.html#VkRect2D).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
