# VkPhysicalDeviceRenderPassStripedPropertiesARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceRenderPassStripedPropertiesARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceRenderPassStripedPropertiesARM - Structure describing striped rendering limits of an implementation

The `VkPhysicalDeviceRenderPassStripedPropertiesARM` structure is
defined as:

// Provided by VK_ARM_render_pass_striped
typedef struct VkPhysicalDeviceRenderPassStripedPropertiesARM {
    VkStructureType    sType;
    void*              pNext;
    VkExtent2D         renderPassStripeGranularity;
    uint32_t           maxRenderPassStripes;
} VkPhysicalDeviceRenderPassStripedPropertiesARM;

The members of the `VkPhysicalDeviceRenderPassStripedPropertiesARM`
structure describe the following limits:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `renderPassStripeGranularity`
indicates the minimum supported granularity of striped render pass
regions.

* 
 `maxRenderPassStripes` indicates the
maximum number of stripes supported in striped rendering.

If the `VkPhysicalDeviceRenderPassStripedPropertiesARM` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceRenderPassStripedPropertiesARM-sType-sType) VUID-VkPhysicalDeviceRenderPassStripedPropertiesARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RENDER_PASS_STRIPED_PROPERTIES_ARM](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_ARM_render_pass_striped](VK_ARM_render_pass_striped.html), [VkExtent2D](VkExtent2D.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceRenderPassStripedPropertiesARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
