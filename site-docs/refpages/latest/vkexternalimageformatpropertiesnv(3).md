# VkExternalImageFormatPropertiesNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkExternalImageFormatPropertiesNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkExternalImageFormatPropertiesNV - Structure specifying external image format properties

The `VkExternalImageFormatPropertiesNV` structure is defined as:

// Provided by VK_NV_external_memory_capabilities
typedef struct VkExternalImageFormatPropertiesNV {
    VkImageFormatProperties              imageFormatProperties;
    VkExternalMemoryFeatureFlagsNV       externalMemoryFeatures;
    VkExternalMemoryHandleTypeFlagsNV    exportFromImportedHandleTypes;
    VkExternalMemoryHandleTypeFlagsNV    compatibleHandleTypes;
} VkExternalImageFormatPropertiesNV;

* 
`imageFormatProperties` will be filled in as when calling
[vkGetPhysicalDeviceImageFormatProperties](vkGetPhysicalDeviceImageFormatProperties.html), but the values returned
**may** vary depending on the external handle type requested.

* 
`externalMemoryFeatures` is a bitmask of
[VkExternalMemoryFeatureFlagBitsNV](VkExternalMemoryFeatureFlagBitsNV.html), indicating properties of the
external memory handle type
([vkGetPhysicalDeviceExternalImageFormatPropertiesNV](vkGetPhysicalDeviceExternalImageFormatPropertiesNV.html)::`externalHandleType`)
being queried, or 0 if the external memory handle type is 0.

* 
`exportFromImportedHandleTypes` is a bitmask of
[VkExternalMemoryHandleTypeFlagBitsNV](VkExternalMemoryHandleTypeFlagBitsNV.html) containing a bit set for
every external handle type that **may** be used to create memory from which
the handles of the type specified in
[vkGetPhysicalDeviceExternalImageFormatPropertiesNV](vkGetPhysicalDeviceExternalImageFormatPropertiesNV.html)::`externalHandleType`
**can** be exported, or 0 if the external memory handle type is 0.

* 
`compatibleHandleTypes` is a bitmask of
[VkExternalMemoryHandleTypeFlagBitsNV](VkExternalMemoryHandleTypeFlagBitsNV.html) containing a bit set for
every external handle type that **may** be specified simultaneously with
the handle type specified by
[vkGetPhysicalDeviceExternalImageFormatPropertiesNV](vkGetPhysicalDeviceExternalImageFormatPropertiesNV.html)::`externalHandleType`
when calling [vkAllocateMemory](vkAllocateMemory.html), or 0 if the external memory handle
type is 0.
`compatibleHandleTypes` will always contain
[vkGetPhysicalDeviceExternalImageFormatPropertiesNV](vkGetPhysicalDeviceExternalImageFormatPropertiesNV.html)::`externalHandleType`

[VK_NV_external_memory_capabilities](VK_NV_external_memory_capabilities.html), [VkExternalMemoryFeatureFlagsNV](VkExternalMemoryFeatureFlagsNV.html), [VkExternalMemoryHandleTypeFlagsNV](VkExternalMemoryHandleTypeFlagsNV.html), [VkImageFormatProperties](VkImageFormatProperties.html), [vkGetPhysicalDeviceExternalImageFormatPropertiesNV](vkGetPhysicalDeviceExternalImageFormatPropertiesNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/capabilities.html#VkExternalImageFormatPropertiesNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
