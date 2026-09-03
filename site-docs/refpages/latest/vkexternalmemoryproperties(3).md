# VkExternalMemoryProperties(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkExternalMemoryProperties.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkExternalMemoryProperties - Structure specifying external memory handle type capabilities

The `VkExternalMemoryProperties` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkExternalMemoryProperties {
    VkExternalMemoryFeatureFlags       externalMemoryFeatures;
    VkExternalMemoryHandleTypeFlags    exportFromImportedHandleTypes;
    VkExternalMemoryHandleTypeFlags    compatibleHandleTypes;
} VkExternalMemoryProperties;

// Provided by VK_KHR_external_memory_capabilities
// Equivalent to VkExternalMemoryProperties
typedef VkExternalMemoryProperties VkExternalMemoryPropertiesKHR;

* 
`externalMemoryFeatures` is a bitmask of
[VkExternalMemoryFeatureFlagBits](VkExternalMemoryFeatureFlagBits.html) specifying the features of
`handleType`.

* 
`exportFromImportedHandleTypes` is a bitmask of
[VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html) specifying which types of
imported handle `handleType` **can** be exported from.

* 
`compatibleHandleTypes` is a bitmask of
[VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html) specifying handle types which
**can** be specified at the same time as `handleType` when creating an
image compatible with external memory.

`compatibleHandleTypes` **must** include at least `handleType`.
Inclusion of a handle type in `compatibleHandleTypes` does not imply the
values returned in [VkImageFormatProperties2](VkImageFormatProperties2.html) will be the same when
[VkPhysicalDeviceExternalImageFormatInfo](VkPhysicalDeviceExternalImageFormatInfo.html)::`handleType` is set to
that type.
The application is responsible for querying the capabilities of all handle
types intended for concurrent use in a single image and intersecting them to
obtain the compatible set of capabilities.

[VK_KHR_external_memory_capabilities](VK_KHR_external_memory_capabilities.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkExternalBufferProperties](VkExternalBufferProperties.html), [VkExternalImageFormatProperties](VkExternalImageFormatProperties.html), [VkExternalMemoryFeatureFlags](VkExternalMemoryFeatureFlags.html), [VkExternalMemoryHandleTypeFlags](VkExternalMemoryHandleTypeFlags.html), [VkExternalTensorPropertiesARM](VkExternalTensorPropertiesARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/capabilities.html#VkExternalMemoryProperties).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
