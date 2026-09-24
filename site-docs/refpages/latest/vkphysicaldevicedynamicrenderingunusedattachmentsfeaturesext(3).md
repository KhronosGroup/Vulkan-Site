# VkPhysicalDeviceDynamicRenderingUnusedAttachmentsFeaturesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceDynamicRenderingUnusedAttachmentsFeaturesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceDynamicRenderingUnusedAttachmentsFeaturesEXT - Structure describing the dynamic rendering unused attachment features that can be supported by an implementation

The `VkPhysicalDeviceDynamicRenderingUnusedAttachmentsFeaturesEXT`
structure is defined as:

// Provided by VK_EXT_dynamic_rendering_unused_attachments
typedef struct VkPhysicalDeviceDynamicRenderingUnusedAttachmentsFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           dynamicRenderingUnusedAttachments;
} VkPhysicalDeviceDynamicRenderingUnusedAttachmentsFeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`dynamicRenderingUnusedAttachments` indicates that the
implementation supports binding graphics pipelines within a render pass
instance where any pipeline
[VkPipelineRenderingCreateInfo](VkPipelineRenderingCreateInfo.html)::`pColorAttachmentFormats`
element with a format other than [VK_FORMAT_UNDEFINED](VkFormat.html) is allowed
with a corresponding [VkRenderingInfo](VkRenderingInfo.html)::`pColorAttachments`
element with an `imageView` equal to [VK_NULL_HANDLE](VK_NULL_HANDLE.html), or any
pipeline
[VkPipelineRenderingCreateInfo](VkPipelineRenderingCreateInfo.html)::`pColorAttachmentFormats`
element with a [VK_FORMAT_UNDEFINED](VkFormat.html) format is allowed with a
corresponding [VkRenderingInfo](VkRenderingInfo.html)::`pColorAttachments` element
with a non-[VK_NULL_HANDLE](VK_NULL_HANDLE.html) `imageView`.
Also a [VkPipelineRenderingCreateInfo](VkPipelineRenderingCreateInfo.html)::`depthAttachmentFormat`
other than [VK_FORMAT_UNDEFINED](VkFormat.html) is allowed with a
[VK_NULL_HANDLE](VK_NULL_HANDLE.html) [VkRenderingInfo](VkRenderingInfo.html)::`pDepthAttachment`, or a
[VkPipelineRenderingCreateInfo](VkPipelineRenderingCreateInfo.html)::`depthAttachmentFormat` of
[VK_FORMAT_UNDEFINED](VkFormat.html) is allowed with a non-[VK_NULL_HANDLE](VK_NULL_HANDLE.html)
[VkRenderingInfo](VkRenderingInfo.html)::`pDepthAttachment`.
Also a
[VkPipelineRenderingCreateInfo](VkPipelineRenderingCreateInfo.html)::`stencilAttachmentFormat` other
than [VK_FORMAT_UNDEFINED](VkFormat.html) is allowed with a [VK_NULL_HANDLE](VK_NULL_HANDLE.html)
[VkRenderingInfo](VkRenderingInfo.html)::`pStencilAttachment`, or a
[VkPipelineRenderingCreateInfo](VkPipelineRenderingCreateInfo.html)::`stencilAttachmentFormat` of
[VK_FORMAT_UNDEFINED](VkFormat.html) is allowed with a non-[VK_NULL_HANDLE](VK_NULL_HANDLE.html)
[VkRenderingInfo](VkRenderingInfo.html)::`pStencilAttachment`.
Any writes to a [VkRenderingInfo](VkRenderingInfo.html)::`pColorAttachments`,
[VkRenderingInfo](VkRenderingInfo.html)::`pDepthAttachment`, or
[VkRenderingInfo](VkRenderingInfo.html)::`pStencilAttachment` with
[VK_NULL_HANDLE](VK_NULL_HANDLE.html) are discarded.

If the `VkPhysicalDeviceDynamicRenderingUnusedAttachmentsFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceDynamicRenderingUnusedAttachmentsFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceDynamicRenderingUnusedAttachmentsFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceDynamicRenderingUnusedAttachmentsFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DYNAMIC_RENDERING_UNUSED_ATTACHMENTS_FEATURES_EXT](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_EXT_dynamic_rendering_unused_attachments](VK_EXT_dynamic_rendering_unused_attachments.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceDynamicRenderingUnusedAttachmentsFeaturesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
