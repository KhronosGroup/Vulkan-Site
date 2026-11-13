# VkPhysicalDeviceBlendOperationAdvancedPropertiesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceBlendOperationAdvancedPropertiesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceBlendOperationAdvancedPropertiesEXT - Structure describing advanced blending limits that can be supported by an implementation

The `VkPhysicalDeviceBlendOperationAdvancedPropertiesEXT` structure is
defined as:

// Provided by VK_EXT_blend_operation_advanced
typedef struct VkPhysicalDeviceBlendOperationAdvancedPropertiesEXT {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           advancedBlendMaxColorAttachments;
    VkBool32           advancedBlendIndependentBlend;
    VkBool32           advancedBlendNonPremultipliedSrcColor;
    VkBool32           advancedBlendNonPremultipliedDstColor;
    VkBool32           advancedBlendCorrelatedOverlap;
    VkBool32           advancedBlendAllOperations;
} VkPhysicalDeviceBlendOperationAdvancedPropertiesEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`advancedBlendMaxColorAttachments` is one greater than the highest
color attachment index that **can** be used in a render pass instance, for
a pipeline that uses an [advanced blend    operation](../../../../spec/latest/chapters/framebuffer.html#framebuffer-blend-advanced).

* 

`advancedBlendIndependentBlend` specifies whether advanced blend
operations **can** vary per-attachment.

* 

`advancedBlendNonPremultipliedSrcColor` specifies whether the source
color **can** be treated as non-premultiplied.
If this is [VK_FALSE](VK_FALSE.html), then
[VkPipelineColorBlendAdvancedStateCreateInfoEXT](VkPipelineColorBlendAdvancedStateCreateInfoEXT.html)::`srcPremultiplied`
**must** be [VK_TRUE](VK_TRUE.html).

* 

`advancedBlendNonPremultipliedDstColor` specifies whether the
destination color **can** be treated as non-premultiplied.
If this is [VK_FALSE](VK_FALSE.html), then
[VkPipelineColorBlendAdvancedStateCreateInfoEXT](VkPipelineColorBlendAdvancedStateCreateInfoEXT.html)::`dstPremultiplied`
**must** be [VK_TRUE](VK_TRUE.html).

* 

`advancedBlendCorrelatedOverlap` specifies whether the overlap mode
**can** be treated as correlated.
If this is [VK_FALSE](VK_FALSE.html), then
[VkPipelineColorBlendAdvancedStateCreateInfoEXT](VkPipelineColorBlendAdvancedStateCreateInfoEXT.html)::`blendOverlap`
**must** be [VK_BLEND_OVERLAP_UNCORRELATED_EXT](VkBlendOverlapEXT.html).

* 
 `advancedBlendAllOperations`
specifies whether all advanced blend operation enums are supported.
See the valid usage of [VkPipelineColorBlendAttachmentState](VkPipelineColorBlendAttachmentState.html).

If the `VkPhysicalDeviceBlendOperationAdvancedPropertiesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceBlendOperationAdvancedPropertiesEXT-sType-sType) VUID-VkPhysicalDeviceBlendOperationAdvancedPropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_BLEND_OPERATION_ADVANCED_PROPERTIES_EXT](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_EXT_blend_operation_advanced](VK_EXT_blend_operation_advanced.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceBlendOperationAdvancedPropertiesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
