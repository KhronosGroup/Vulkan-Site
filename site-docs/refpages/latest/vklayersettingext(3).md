# VkLayerSettingEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkLayerSettingEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkLayerSettingEXT - Specify a layer capability to configure

The values of elements of the
[VkLayerSettingsCreateInfoEXT](VkLayerSettingsCreateInfoEXT.html)::`pSettings` array, specifying layer
settings to be configured, are:

// Provided by VK_EXT_layer_settings
typedef struct VkLayerSettingEXT {
    const char*              pLayerName;
    const char*              pSettingName;
    VkLayerSettingTypeEXT    type;
    uint32_t                 valueCount;
    const void*              pValues;
} VkLayerSettingEXT;

* 
`pLayerName` is a pointer to a null-terminated UTF-8 string naming
the layer to configure the setting from.

* 
`pSettingName` is a pointer to a null-terminated UTF-8 string naming
the setting to configure.
Values of `pSettingName` that are unknown to the layer are ignored.

* 
`type` is a [VkLayerSettingTypeEXT](VkLayerSettingTypeEXT.html) value specifying the type of
the `pValues` values.

* 
`valueCount` is the number of values used to configure the layer
setting.

* 
`pValues` is a pointer to an array of `valueCount` values of the
type indicated by `type` to configure the layer setting.

When multiple [VkLayerSettingsCreateInfoEXT](VkLayerSettingsCreateInfoEXT.html) structures are chained and
the same `pSettingName` is referenced for the same `pLayerName`, the
value of the first reference of the layer setting is used.

Valid Usage

* 
[](#VUID-VkLayerSettingEXT-valueCount-10070) VUID-VkLayerSettingEXT-valueCount-10070

If `valueCount` is not `0`, `pValues` **must** be a valid pointer
to an array of `valueCount` values of the type indicated by
`type`

Valid Usage (Implicit)

* 
[](#VUID-VkLayerSettingEXT-pLayerName-parameter) VUID-VkLayerSettingEXT-pLayerName-parameter

 `pLayerName` **must** be a null-terminated UTF-8 string

* 
[](#VUID-VkLayerSettingEXT-pSettingName-parameter) VUID-VkLayerSettingEXT-pSettingName-parameter

 `pSettingName` **must** be a null-terminated UTF-8 string

* 
[](#VUID-VkLayerSettingEXT-type-parameter) VUID-VkLayerSettingEXT-type-parameter

 `type` **must** be a valid [VkLayerSettingTypeEXT](VkLayerSettingTypeEXT.html) value

[VK_EXT_layer_settings](VK_EXT_layer_settings.html), [VkLayerSettingTypeEXT](VkLayerSettingTypeEXT.html), [VkLayerSettingsCreateInfoEXT](VkLayerSettingsCreateInfoEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/initialization.html#VkLayerSettingEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
