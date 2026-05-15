# VK_KHR_external_semaphore_capabilities(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_external_semaphore_capabilities.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_external_semaphore_capabilities](#VK_KHR_external_semaphore_capabilities)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [Promotion to Vulkan 1.1](#_promotion_to_vulkan_1_1)
- [Promotion_to_Vulkan_1.1](#_promotion_to_vulkan_1_1)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_external_semaphore_capabilities - instance extension

**Name String**

`VK_KHR_external_semaphore_capabilities`

**Extension Type**

Instance extension

**Registered Extension Number**

77

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1-promotions)

**Contact**

* 
James Jones [cubanismo](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_external_semaphore_capabilities] @cubanismo%0A*Here describe the issue or question you have about the VK_KHR_external_semaphore_capabilities extension*)

**Last Modified Date**

2016-10-20

**IP Status**

No known IP claims.

**Contributors**

* 
Jesse Hall, Google

* 
James Jones, NVIDIA

* 
Jeff Juliano, NVIDIA

An application may wish to reference device semaphores in multiple Vulkan
logical devices or instances, in multiple processes, and/or in multiple
APIs.
This extension provides a set of capability queries and handle definitions
that allow an application to determine what types of “external” semaphore
handles an implementation supports for a given set of use cases.

All functionality in this extension is included in core Vulkan 1.1, with the
KHR suffix omitted.
The original type, enum, and command names are still available as aliases of
the core functionality.

* 
[vkGetPhysicalDeviceExternalSemaphorePropertiesKHR](vkGetPhysicalDeviceExternalSemaphoreProperties.html)

* 
[VkExternalSemaphorePropertiesKHR](VkExternalSemaphoreProperties.html)

* 
[VkPhysicalDeviceExternalSemaphoreInfoKHR](VkPhysicalDeviceExternalSemaphoreInfo.html)

* 
Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

[VkPhysicalDeviceIDPropertiesKHR](VkPhysicalDeviceIDProperties.html)

* 
[VkExternalSemaphoreFeatureFlagBitsKHR](VkExternalSemaphoreFeatureFlagBits.html)

* 
[VkExternalSemaphoreHandleTypeFlagBitsKHR](VkExternalSemaphoreHandleTypeFlagBits.html)

* 
[VkExternalSemaphoreFeatureFlagsKHR](VkExternalSemaphoreFeatureFlags.html)

* 
[VkExternalSemaphoreHandleTypeFlagsKHR](VkExternalSemaphoreHandleTypeFlags.html)

* 
`VK_KHR_EXTERNAL_SEMAPHORE_CAPABILITIES_EXTENSION_NAME`

* 
`VK_KHR_EXTERNAL_SEMAPHORE_CAPABILITIES_SPEC_VERSION`

* 
[VK_LUID_SIZE_KHR](VK_LUID_SIZE.html)

* 
Extending [VkExternalSemaphoreFeatureFlagBits](VkExternalSemaphoreFeatureFlagBits.html):

[VK_EXTERNAL_SEMAPHORE_FEATURE_EXPORTABLE_BIT_KHR](VkExternalSemaphoreFeatureFlagBits.html)

* 
[VK_EXTERNAL_SEMAPHORE_FEATURE_IMPORTABLE_BIT_KHR](VkExternalSemaphoreFeatureFlagBits.html)

Extending [VkExternalSemaphoreHandleTypeFlagBits](VkExternalSemaphoreHandleTypeFlagBits.html):

* 
[VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_D3D12_FENCE_BIT_KHR](VkExternalSemaphoreHandleTypeFlagBits.html)

* 
[VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_OPAQUE_FD_BIT_KHR](VkExternalSemaphoreHandleTypeFlagBits.html)

* 
[VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_OPAQUE_WIN32_BIT_KHR](VkExternalSemaphoreHandleTypeFlagBits.html)

* 
[VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_OPAQUE_WIN32_KMT_BIT_KHR](VkExternalSemaphoreHandleTypeFlagBits.html)

* 
[VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_SYNC_FD_BIT_KHR](VkExternalSemaphoreHandleTypeFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_EXTERNAL_SEMAPHORE_PROPERTIES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTERNAL_SEMAPHORE_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_ID_PROPERTIES_KHR](VkStructureType.html)

* 
Revision 1, 2016-10-20 (James Jones)

Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_external_semaphore_capabilities).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
