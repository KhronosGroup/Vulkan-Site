# VkExternalFenceProperties(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkExternalFenceProperties.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkExternalFenceProperties - Structure describing supported external fence handle features

The `VkExternalFenceProperties` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkExternalFenceProperties {
    VkStructureType                   sType;
    void*                             pNext;
    VkExternalFenceHandleTypeFlags    exportFromImportedHandleTypes;
    VkExternalFenceHandleTypeFlags    compatibleHandleTypes;
    VkExternalFenceFeatureFlags       externalFenceFeatures;
} VkExternalFenceProperties;

// Provided by VK_KHR_external_fence_capabilities
// Equivalent to VkExternalFenceProperties
typedef VkExternalFenceProperties VkExternalFencePropertiesKHR;

* 
`exportFromImportedHandleTypes` is a bitmask of
[VkExternalFenceHandleTypeFlagBits](VkExternalFenceHandleTypeFlagBits.html) indicating which types of
imported handle `handleType` **can** be exported from.

* 
`compatibleHandleTypes` is a bitmask of
[VkExternalFenceHandleTypeFlagBits](VkExternalFenceHandleTypeFlagBits.html) specifying handle types which
**can** be specified at the same time as `handleType` when creating a
fence.

* 
`externalFenceFeatures` is a bitmask of
[VkExternalFenceFeatureFlagBits](VkExternalFenceFeatureFlagBits.html) indicating the features of
`handleType`.

If `handleType` is not supported by the implementation, then
[VkExternalFenceProperties](#)::`externalFenceFeatures` will be zero.

Valid Usage (Implicit)

* 
[](#VUID-VkExternalFenceProperties-sType-sType) VUID-VkExternalFenceProperties-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_EXTERNAL_FENCE_PROPERTIES](VkStructureType.html)

* 
[](#VUID-VkExternalFenceProperties-pNext-pNext) VUID-VkExternalFenceProperties-pNext-pNext

 `pNext` **must** be `NULL`

[VK_KHR_external_fence_capabilities](VK_KHR_external_fence_capabilities.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkExternalFenceFeatureFlags](VkExternalFenceFeatureFlags.html), [VkExternalFenceHandleTypeFlags](VkExternalFenceHandleTypeFlags.html), [VkStructureType](VkStructureType.html), [vkGetPhysicalDeviceExternalFenceProperties](vkGetPhysicalDeviceExternalFenceProperties.html), [vkGetPhysicalDeviceExternalFenceProperties](vkGetPhysicalDeviceExternalFenceProperties.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/capabilities.html#VkExternalFenceProperties).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
