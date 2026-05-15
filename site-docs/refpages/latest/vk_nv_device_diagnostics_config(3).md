# VK_NV_device_diagnostics_config(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_NV_device_diagnostics_config.html

## Table of Contents

- [Name](#_name)
- [VK_NV_device_diagnostics_config](#VK_NV_device_diagnostics_config)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_NV_device_diagnostics_config - device extension

**Name String**

`VK_NV_device_diagnostics_config`

**Extension Type**

Device extension

**Registered Extension Number**

301

**Revision**

2

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Contact**

* 
Kedarnath Thangudu [kthangudu](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_NV_device_diagnostics_config] @kthangudu%0A*Here describe the issue or question you have about the VK_NV_device_diagnostics_config extension*)

**Last Modified Date**

2022-04-06

**Contributors**

* 
Kedarnath Thangudu, NVIDIA

* 
Thomas Klein, NVIDIA

Applications using Nvidia Nsight™ Aftermath SDK for Vulkan to integrate
device crash dumps into their error reporting mechanisms, **may** use this
extension to configure options related to device crash dump creation.

Version 2 of this extension adds
[VK_DEVICE_DIAGNOSTICS_CONFIG_ENABLE_SHADER_ERROR_REPORTING_BIT_NV](VkDeviceDiagnosticsConfigFlagBitsNV.html)
which when set enables enhanced reporting of shader execution errors.

* 
Extending [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkDeviceDiagnosticsConfigCreateInfoNV](VkDeviceDiagnosticsConfigCreateInfoNV.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDeviceDiagnosticsConfigFeaturesNV](VkPhysicalDeviceDiagnosticsConfigFeaturesNV.html)

* 
[VkDeviceDiagnosticsConfigFlagBitsNV](VkDeviceDiagnosticsConfigFlagBitsNV.html)

* 
[VkDeviceDiagnosticsConfigFlagsNV](VkDeviceDiagnosticsConfigFlagsNV.html)

* 
`VK_NV_DEVICE_DIAGNOSTICS_CONFIG_EXTENSION_NAME`

* 
`VK_NV_DEVICE_DIAGNOSTICS_CONFIG_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_DEVICE_DIAGNOSTICS_CONFIG_CREATE_INFO_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DIAGNOSTICS_CONFIG_FEATURES_NV](VkStructureType.html)

* 
Revision 1, 2019-11-21 (Kedarnath Thangudu)

Internal revisions

Revision 2, 2022-04-06 (Kedarnath Thangudu)

* 
Added a config bit
[VK_DEVICE_DIAGNOSTICS_CONFIG_ENABLE_SHADER_ERROR_REPORTING_BIT_NV](VkDeviceDiagnosticsConfigFlagBitsNV.html)

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_NV_device_diagnostics_config).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
