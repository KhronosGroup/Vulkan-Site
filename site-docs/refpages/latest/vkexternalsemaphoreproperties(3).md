# VkExternalSemaphoreProperties(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkExternalSemaphoreProperties.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkExternalSemaphoreProperties - Structure describing supported external semaphore handle features

The `VkExternalSemaphoreProperties` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkExternalSemaphoreProperties {
    VkStructureType                       sType;
    void*                                 pNext;
    VkExternalSemaphoreHandleTypeFlags    exportFromImportedHandleTypes;
    VkExternalSemaphoreHandleTypeFlags    compatibleHandleTypes;
    VkExternalSemaphoreFeatureFlags       externalSemaphoreFeatures;
} VkExternalSemaphoreProperties;

// Provided by VK_KHR_external_semaphore_capabilities
// Equivalent to VkExternalSemaphoreProperties
typedef VkExternalSemaphoreProperties VkExternalSemaphorePropertiesKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`exportFromImportedHandleTypes` is a bitmask of
[VkExternalSemaphoreHandleTypeFlagBits](VkExternalSemaphoreHandleTypeFlagBits.html) specifying which types of
imported handle `handleType` **can** be exported from.

* 
`compatibleHandleTypes` is a bitmask of
[VkExternalSemaphoreHandleTypeFlagBits](VkExternalSemaphoreHandleTypeFlagBits.html) specifying handle types
which **can** be specified at the same time as `handleType` when
creating a semaphore.

* 
`externalSemaphoreFeatures` is a bitmask of
[VkExternalSemaphoreFeatureFlagBits](VkExternalSemaphoreFeatureFlagBits.html) describing the features of
`handleType`.

If `handleType` is not supported by the implementation, then
[VkExternalSemaphoreProperties](#)::`externalSemaphoreFeatures` will be
zero.

Valid Usage (Implicit)

* 
[](#VUID-VkExternalSemaphoreProperties-sType-sType) VUID-VkExternalSemaphoreProperties-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_EXTERNAL_SEMAPHORE_PROPERTIES](VkStructureType.html)

* 
[](#VUID-VkExternalSemaphoreProperties-pNext-pNext) VUID-VkExternalSemaphoreProperties-pNext-pNext

 `pNext` **must** be `NULL`

[VK_KHR_external_semaphore_capabilities](VK_KHR_external_semaphore_capabilities.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkExternalSemaphoreFeatureFlags](VkExternalSemaphoreFeatureFlags.html), [VkExternalSemaphoreHandleTypeFlags](VkExternalSemaphoreHandleTypeFlags.html), [VkStructureType](VkStructureType.html), [vkGetPhysicalDeviceExternalSemaphoreProperties](vkGetPhysicalDeviceExternalSemaphoreProperties.html), [vkGetPhysicalDeviceExternalSemaphoreProperties](vkGetPhysicalDeviceExternalSemaphoreProperties.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/capabilities.html#VkExternalSemaphoreProperties).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
