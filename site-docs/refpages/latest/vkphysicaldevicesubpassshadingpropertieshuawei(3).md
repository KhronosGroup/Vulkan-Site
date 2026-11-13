# VkPhysicalDeviceSubpassShadingPropertiesHUAWEI(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceSubpassShadingPropertiesHUAWEI.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceSubpassShadingPropertiesHUAWEI - Structure describing subpass shading properties supported by an implementation

The `VkPhysicalDeviceSubpassShadingPropertiesHUAWEI` structure is
defined as:

// Provided by VK_HUAWEI_subpass_shading
typedef struct VkPhysicalDeviceSubpassShadingPropertiesHUAWEI {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           maxSubpassShadingWorkgroupSizeAspectRatio;
} VkPhysicalDeviceSubpassShadingPropertiesHUAWEI;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`maxSubpassShadingWorkgroupSizeAspectRatio` indicates the maximum
ratio between the width and height of the portion of the subpass shading
shader workgroup size.
`maxSubpassShadingWorkgroupSizeAspectRatio` **must** be a power-of-two
value, and **must** be less than or equal to max(`WorkgroupSize.x` /
`WorkgroupSize.y`, `WorkgroupSize.y` / `WorkgroupSize.x`).

If the `VkPhysicalDeviceSubpassShadingPropertiesHUAWEI` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceSubpassShadingPropertiesHUAWEI-sType-sType) VUID-VkPhysicalDeviceSubpassShadingPropertiesHUAWEI-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SUBPASS_SHADING_PROPERTIES_HUAWEI](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_HUAWEI_subpass_shading](VK_HUAWEI_subpass_shading.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceSubpassShadingPropertiesHUAWEI).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
