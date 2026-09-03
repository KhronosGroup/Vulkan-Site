# VK_HUAWEI_hdr_vivid(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_HUAWEI_hdr_vivid.html

## Table of Contents

- [Name](#_name)
- [VK_HUAWEI_hdr_vivid](#VK_HUAWEI_hdr_vivid)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_HUAWEI_hdr_vivid - device extension

**Name String**

`VK_HUAWEI_hdr_vivid`

**Extension Type**

Device extension

**Registered Extension Number**

591

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

     [VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

     or

     [Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

and

[VK_KHR_swapchain](VK_KHR_swapchain.html)

and

[VK_EXT_hdr_metadata](VK_EXT_hdr_metadata.html)

**Contact**

* 
Zehui Lin [bactlink](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_HUAWEI_hdr_vivid] @bactlink%0A*Here describe the issue or question you have about the VK_HUAWEI_hdr_vivid extension*)

**Last Modified Date**

2024-10-08

**IP Status**

No known IP claims.

**Contributors**

* 
Juntao Li, Huawei

* 
Pan Gao, Huawei

* 
Xiufeng Zhang, Huawei

* 
Zehui Lin, Huawei

This extension allows applications to assign HDR Vivid (T/UWA 005.1-2022)
metadata to swapchains.

HDR Vivid is an HDR standard released by UWA (UHD World Association).
It defines tone mapping from the metadata to better preserve the creator’s
intentions and achieve better consistency across devices with different
display capabilities.

* 
Extending [VkHdrMetadataEXT](VkHdrMetadataEXT.html):

[VkHdrVividDynamicMetadataHUAWEI](VkHdrVividDynamicMetadataHUAWEI.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDeviceHdrVividFeaturesHUAWEI](VkPhysicalDeviceHdrVividFeaturesHUAWEI.html)

* 
`VK_HUAWEI_HDR_VIVID_EXTENSION_NAME`

* 
`VK_HUAWEI_HDR_VIVID_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_HDR_VIVID_DYNAMIC_METADATA_HUAWEI](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_HDR_VIVID_FEATURES_HUAWEI](VkStructureType.html)

* 
Revision 1, 2024-10-08 (Zehui Lin)

Initial version

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_HUAWEI_hdr_vivid).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
