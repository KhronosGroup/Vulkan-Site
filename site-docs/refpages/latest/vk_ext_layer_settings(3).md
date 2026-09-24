# VK_EXT_layer_settings(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_layer_settings.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_layer_settings](#VK_EXT_layer_settings)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Example](#_example)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_layer_settings - instance extension

**Name String**

`VK_EXT_layer_settings`

**Extension Type**

Instance extension

**Registered Extension Number**

497

**Revision**

2

**Ratification Status**

Ratified

**Extension and Version Dependencies**

None

**Contact**

* 
Christophe Riccio [christophe](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_layer_settings] @christophe%0A*Here describe the issue or question you have about the VK_EXT_layer_settings extension*)

**Extension Proposal**

[VK_EXT_layer_settings](../../../../features/latest/features/proposals/VK_EXT_layer_settings.html)

**Last Modified Date**

2023-09-23

**IP Status**

No known IP claims.

**Contributors**

* 
Christophe Riccio, LunarG

* 
Mark Lobodzinski, LunarG

* 
Charles Giessen, LunarG

* 
Spencer Fricke, LunarG

* 
Juan Ramos, LunarG

* 
Daniel Rakos, RasterGrid

* 
Shahbaz Youssefi, Google

* 
Lina Versace, Google

* 
Bill Hollings, The Brenwill Workshop

* 
Jon Leech, Khronos

* 
Tom Olson, Arm

This extension provides a mechanism for configuring programmatically through
the Vulkan API the behavior of layers.

This extension provides the [VkLayerSettingsCreateInfoEXT](VkLayerSettingsCreateInfoEXT.html) structure
that can be included in the `pNext` chain of the
[VkInstanceCreateInfo](VkInstanceCreateInfo.html) structure passed as the `pCreateInfo`
parameter of [vkCreateInstance](vkCreateInstance.html).

The structure contains an array of [VkLayerSettingEXT](VkLayerSettingEXT.html) structure values
that configure specific features of layers.

|  | The `[VK_EXT_layer_settings](#)` extension subsumes all the functionality
| --- | --- |
provided in the `[VK_EXT_validation_flags](VK_EXT_validation_flags.html)` extension and the
`[VK_EXT_validation_features](VK_EXT_validation_features.html)` extension. |

* 
[VkLayerSettingEXT](VkLayerSettingEXT.html)

* 
Extending [VkInstanceCreateInfo](VkInstanceCreateInfo.html):

[VkLayerSettingsCreateInfoEXT](VkLayerSettingsCreateInfoEXT.html)

* 
[VkLayerSettingTypeEXT](VkLayerSettingTypeEXT.html)

* 
`VK_EXT_LAYER_SETTINGS_EXTENSION_NAME`

* 
`VK_EXT_LAYER_SETTINGS_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_LAYER_SETTINGS_CREATE_INFO_EXT](VkStructureType.html)

One example usage of `VK_EXT_layer_settings` is as implemented by the Vulkan
Profiles layer.

It allows the profiles layer tests used by the profiles layer C.I.
to programmatically configure the layer for each test without affecting the
C.I.
environment, allowing to run multiple tests concurrently.

const char* profile_file_data = JSON_TEST_FILES_PATH "VP_KHR_roadmap_2022.json";
const char* profile_name_data = "VP_KHR_roadmap_2022";
VkBool32 emulate_portability_data = VK_TRUE;
const char* simulate_capabilities[] = {
    "SIMULATE_API_VERSION_BIT",
    "SIMULATE_FEATURES_BIT",
    "SIMULATE_PROPERTIES_BIT",
    "SIMULATE_EXTENSIONS_BIT",
    "SIMULATE_FORMATS_BIT",
    "SIMULATE_QUEUE_FAMILY_PROPERTIES_BIT"
};
const char* debug_reports[] = {
    "DEBUG_REPORT_ERROR_BIT",
    "DEBUG_REPORT_WARNING_BIT",
    "DEBUG_REPORT_NOTIFICATION_BIT",
    "DEBUG_REPORT_DEBUG_BIT"
};

const VkLayerSettingEXT settings[] = {
     {kLayerName, kLayerSettingsProfileFile, VK_LAYER_SETTING_TYPE_STRING_EXT, 1, &profile_file_data},
     {kLayerName, kLayerSettingsProfileName, VK_LAYER_SETTING_TYPE_STRING_EXT, 1, &profile_name_data},
     {kLayerName, kLayerSettingsEmulatePortability, VK_LAYER_SETTING_TYPE_BOOL32_EXT, 1, &emulate_portability_data},
     {kLayerName, kLayerSettingsSimulateCapabilities, VK_LAYER_SETTING_TYPE_STRING_EXT,
        static_cast(std::size(simulate_capabilities)), simulate_capabilities},
     {kLayerName, kLayerSettingsDebugReports, VK_LAYER_SETTING_TYPE_STRING_EXT,
        static_cast(std::size(debug_reports)), debug_reports}
};

const VkLayerSettingsCreateInfoEXT layer_settings_create_info{
    VK_STRUCTURE_TYPE_LAYER_SETTINGS_CREATE_INFO_EXT, nullptr,
    static_cast(std::size(settings)), settings};

VkInstanceCreateInfo inst_create_info = {};
...
inst_create_info.pNext = &layer_settings_create_info;
vkCreateInstance(&inst_create_info, nullptr, &_instances);

* 
How should application developers figure out the list of available
settings?

This extension does not provide a reflection API for layer settings.
Layer settings are described in each layer JSON manifest and the
documentation of each layer which implements this extension.

* 
Revision 1, 2020-06-17 (Mark Lobodzinski)

Initial revision for Validation layer internal usages

Revision 2, 2023-09-26 (Christophe Riccio)

* 
Refactor APIs for any layer usages and public release

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_layer_settings).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
