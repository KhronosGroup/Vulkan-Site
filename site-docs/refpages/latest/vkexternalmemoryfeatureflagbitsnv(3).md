# VkExternalMemoryFeatureFlagBitsNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkExternalMemoryFeatureFlagBitsNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkExternalMemoryFeatureFlagBitsNV - Bitmask specifying external memory features

Bits which **can** be set in
[VkExternalImageFormatPropertiesNV](VkExternalImageFormatPropertiesNV.html)::`externalMemoryFeatures`,
indicating properties of the external memory handle type, are:

// Provided by VK_NV_external_memory_capabilities
typedef enum VkExternalMemoryFeatureFlagBitsNV {
    VK_EXTERNAL_MEMORY_FEATURE_DEDICATED_ONLY_BIT_NV = 0x00000001,
    VK_EXTERNAL_MEMORY_FEATURE_EXPORTABLE_BIT_NV = 0x00000002,
    VK_EXTERNAL_MEMORY_FEATURE_IMPORTABLE_BIT_NV = 0x00000004,
} VkExternalMemoryFeatureFlagBitsNV;

* 
[VK_EXTERNAL_MEMORY_FEATURE_DEDICATED_ONLY_BIT_NV](#) specifies that
external memory of the specified type **must** be created as a dedicated
allocation when used in the manner specified.

* 
[VK_EXTERNAL_MEMORY_FEATURE_EXPORTABLE_BIT_NV](#) specifies that the
implementation supports exporting handles of the specified type.

* 
[VK_EXTERNAL_MEMORY_FEATURE_IMPORTABLE_BIT_NV](#) specifies that the
implementation supports importing handles of the specified type.

[VK_NV_external_memory_capabilities](VK_NV_external_memory_capabilities.html), [VkExternalImageFormatPropertiesNV](VkExternalImageFormatPropertiesNV.html), [VkExternalMemoryFeatureFlagsNV](VkExternalMemoryFeatureFlagsNV.html), [vkGetPhysicalDeviceExternalImageFormatPropertiesNV](vkGetPhysicalDeviceExternalImageFormatPropertiesNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/capabilities.html#VkExternalMemoryFeatureFlagBitsNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
