# VK_KHR_driver_properties(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_driver_properties.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_driver_properties](#VK_KHR_driver_properties)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [Promotion to Vulkan 1.2](#_promotion_to_vulkan_1_2)
- [Promotion_to_Vulkan_1.2](#_promotion_to_vulkan_1_2)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_driver_properties - device extension

**Name String**

`VK_KHR_driver_properties`

**Extension Type**

Device extension

**Registered Extension Number**

197

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
[Vulkan 1.2](../../../../spec/latest/appendices/versions.html#versions-1.2-promotions)

**Contact**

* 
Daniel Rakos [drakos-amd](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_driver_properties] @drakos-amd%0A*Here describe the issue or question you have about the VK_KHR_driver_properties extension*)

**Last Modified Date**

2018-04-11

**IP Status**

No known IP claims.

**Contributors**

* 
Baldur Karlsson

* 
Matthaeus G. Chajdas, AMD

* 
Piers Daniell, NVIDIA

* 
Alexander Galazin, Arm

* 
Jesse Hall, Google

* 
Daniel Rakos, AMD

This extension provides a new physical device query which allows retrieving
information about the driver implementation, allowing applications to
determine which physical device corresponds to which particular vendor’s
driver, and which conformance test suite version the driver implementation
is compliant with.

All functionality in this extension is included in core Vulkan 1.2, with the
KHR suffix omitted.
The original type, enum, and command names are still available as aliases of
the core functionality.

* 
[VkConformanceVersionKHR](VkConformanceVersion.html)

* 
Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

[VkPhysicalDeviceDriverPropertiesKHR](VkPhysicalDeviceDriverProperties.html)

* 
[VkDriverIdKHR](VkDriverId.html)

* 
`VK_KHR_DRIVER_PROPERTIES_EXTENSION_NAME`

* 
`VK_KHR_DRIVER_PROPERTIES_SPEC_VERSION`

* 
[VK_MAX_DRIVER_INFO_SIZE_KHR](VK_MAX_DRIVER_INFO_SIZE.html)

* 
[VK_MAX_DRIVER_NAME_SIZE_KHR](VK_MAX_DRIVER_NAME_SIZE.html)

* 
Extending [VkDriverId](VkDriverId.html):

[VK_DRIVER_ID_AMD_OPEN_SOURCE_KHR](VkDriverId.html)

* 
[VK_DRIVER_ID_AMD_PROPRIETARY_KHR](VkDriverId.html)

* 
[VK_DRIVER_ID_ARM_PROPRIETARY_KHR](VkDriverId.html)

* 
[VK_DRIVER_ID_BROADCOM_PROPRIETARY_KHR](VkDriverId.html)

* 
[VK_DRIVER_ID_GGP_PROPRIETARY_KHR](VkDriverId.html)

* 
[VK_DRIVER_ID_GOOGLE_SWIFTSHADER_KHR](VkDriverId.html)

* 
[VK_DRIVER_ID_IMAGINATION_PROPRIETARY_KHR](VkDriverId.html)

* 
[VK_DRIVER_ID_INTEL_OPEN_SOURCE_MESA_KHR](VkDriverId.html)

* 
[VK_DRIVER_ID_INTEL_PROPRIETARY_WINDOWS_KHR](VkDriverId.html)

* 
[VK_DRIVER_ID_MESA_RADV_KHR](VkDriverId.html)

* 
[VK_DRIVER_ID_NVIDIA_PROPRIETARY_KHR](VkDriverId.html)

* 
[VK_DRIVER_ID_QUALCOMM_PROPRIETARY_KHR](VkDriverId.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DRIVER_PROPERTIES_KHR](VkStructureType.html)

* 
Revision 1, 2018-04-11 (Daniel Rakos)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_driver_properties).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
