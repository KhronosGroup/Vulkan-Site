# VK_MSFT_layered_driver(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_MSFT_layered_driver.html

## Table of Contents

- [Name](#_name)
- [VK_MSFT_layered_driver](#VK_MSFT_layered_driver)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Examples](#_examples)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_MSFT_layered_driver - device extension

**Name String**

`VK_MSFT_layered_driver`

**Extension Type**

Device extension

**Registered Extension Number**

531

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Contact**

* 
Jesse Natalie [jenatali](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_MSFT_layered_driver] @jenatali%0A*Here describe the issue or question you have about the VK_MSFT_layered_driver extension*)

**Extension Proposal**

[VK_MSFT_layered_driver](../../../../features/latest/features/proposals/VK_MSFT_layered_driver.html)

**Last Modified Date**

2023-06-21

**IP Status**

No known IP claims.

**Contributors**

* 
Jesse Natalie, Microsoft

This extension adds new physical device properties to allow applications and
the Vulkan ICD loader to understand when a physical device is implemented as
a layered driver on top of another underlying API.

* 
Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

[VkPhysicalDeviceLayeredDriverPropertiesMSFT](VkPhysicalDeviceLayeredDriverPropertiesMSFT.html)

* 
[VkLayeredDriverUnderlyingApiMSFT](VkLayeredDriverUnderlyingApiMSFT.html)

* 
`VK_MSFT_LAYERED_DRIVER_EXTENSION_NAME`

* 
`VK_MSFT_LAYERED_DRIVER_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_LAYERED_DRIVER_PROPERTIES_MSFT](VkStructureType.html)

None.

* 
Revision 1, 2023-06-21 (Jesse Natalie)

Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_MSFT_layered_driver).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
