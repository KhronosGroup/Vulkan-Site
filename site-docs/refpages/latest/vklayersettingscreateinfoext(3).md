# VkLayerSettingsCreateInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkLayerSettingsCreateInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkLayerSettingsCreateInfoEXT - Specify layer capabilities for a Vulkan instance

To create a Vulkan instance with a specific configuration of layer settings,
add [VkLayerSettingsCreateInfoEXT](#) structures to the `pNext` chain
of the [VkInstanceCreateInfo](VkInstanceCreateInfo.html) structure, specifying the settings to be
configured.

// Provided by VK_EXT_layer_settings
typedef struct VkLayerSettingsCreateInfoEXT {
    VkStructureType             sType;
    const void*                 pNext;
    uint32_t                    settingCount;
    const VkLayerSettingEXT*    pSettings;
} VkLayerSettingsCreateInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`settingCount` is the number of settings to configure.

* 
`pSettings` is a pointer to an array of `settingCount`
[VkLayerSettingEXT](VkLayerSettingEXT.html) values specifying the settings to be configured.

Valid Usage (Implicit)

* 
[](#VUID-VkLayerSettingsCreateInfoEXT-sType-sType) VUID-VkLayerSettingsCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_LAYER_SETTINGS_CREATE_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkLayerSettingsCreateInfoEXT-pSettings-parameter) VUID-VkLayerSettingsCreateInfoEXT-pSettings-parameter

 If `settingCount` is not `0`, `pSettings` **must** be a valid pointer to an array of `settingCount` valid [VkLayerSettingEXT](VkLayerSettingEXT.html) structures

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkInstanceCreateInfo](VkInstanceCreateInfo.html)

[VK_EXT_layer_settings](VK_EXT_layer_settings.html), [VkLayerSettingEXT](VkLayerSettingEXT.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/initialization.html#VkLayerSettingsCreateInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
