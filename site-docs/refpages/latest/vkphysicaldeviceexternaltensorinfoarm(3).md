# VkPhysicalDeviceExternalTensorInfoARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceExternalTensorInfoARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceExternalTensorInfoARM - Structure specifying tensor creation parameters.

The `VkPhysicalDeviceExternalTensorInfoARM` structure is defined as:

// Provided by VK_ARM_tensors
typedef struct VkPhysicalDeviceExternalTensorInfoARM {
    VkStructureType                       sType;
    const void*                           pNext;
    VkTensorCreateFlagsARM                flags;
    const VkTensorDescriptionARM*         pDescription;
    VkExternalMemoryHandleTypeFlagBits    handleType;
} VkPhysicalDeviceExternalTensorInfoARM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkTensorCreateFlagBitsARM](VkTensorCreateFlagBitsARM.html) describing
additional parameters of the tensor, corresponding to
[VkTensorCreateInfoARM](VkTensorCreateInfoARM.html)::`flags`.

* 
`pDescription` is a [VkTensorDescriptionARM](VkTensorDescriptionARM.html) structure
describing the tensor, corresponding to
[VkTensorCreateInfoARM](VkTensorCreateInfoARM.html)::`pDescription`.

* 
`handleType` is a [VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html) value
specifying the external memory handle type for which capabilities will
be returned.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceExternalTensorInfoARM-sType-sType) VUID-VkPhysicalDeviceExternalTensorInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTERNAL_TENSOR_INFO_ARM](VkStructureType.html)

* 
[](#VUID-VkPhysicalDeviceExternalTensorInfoARM-pNext-pNext) VUID-VkPhysicalDeviceExternalTensorInfoARM-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkPhysicalDeviceExternalTensorInfoARM-flags-parameter) VUID-VkPhysicalDeviceExternalTensorInfoARM-flags-parameter

 `flags` **must** be a valid combination of [VkTensorCreateFlagBitsARM](VkTensorCreateFlagBitsARM.html) values

* 
[](#VUID-VkPhysicalDeviceExternalTensorInfoARM-pDescription-parameter) VUID-VkPhysicalDeviceExternalTensorInfoARM-pDescription-parameter

 `pDescription` **must** be a valid pointer to a valid [VkTensorDescriptionARM](VkTensorDescriptionARM.html) structure

* 
[](#VUID-VkPhysicalDeviceExternalTensorInfoARM-handleType-parameter) VUID-VkPhysicalDeviceExternalTensorInfoARM-handleType-parameter

 `handleType` **must** be a valid [VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html) value

[VK_ARM_tensors](VK_ARM_tensors.html), [VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html), [VkStructureType](VkStructureType.html), [VkTensorCreateFlagsARM](VkTensorCreateFlagsARM.html), [VkTensorDescriptionARM](VkTensorDescriptionARM.html), [vkGetPhysicalDeviceExternalTensorPropertiesARM](vkGetPhysicalDeviceExternalTensorPropertiesARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/capabilities.html#VkPhysicalDeviceExternalTensorInfoARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
