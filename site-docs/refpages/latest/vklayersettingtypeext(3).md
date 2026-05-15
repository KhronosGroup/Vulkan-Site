# VkLayerSettingTypeEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkLayerSettingTypeEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkLayerSettingTypeEXT - Type of the values that can be passed to a layer

Possible values of [VkLayerSettingEXT](VkLayerSettingEXT.html)::`type`, specifying the type
of the data returned in [VkLayerSettingEXT](VkLayerSettingEXT.html)::`pValues`, are:

// Provided by VK_EXT_layer_settings
typedef enum VkLayerSettingTypeEXT {
    VK_LAYER_SETTING_TYPE_BOOL32_EXT = 0,
    VK_LAYER_SETTING_TYPE_INT32_EXT = 1,
    VK_LAYER_SETTING_TYPE_INT64_EXT = 2,
    VK_LAYER_SETTING_TYPE_UINT32_EXT = 3,
    VK_LAYER_SETTING_TYPE_UINT64_EXT = 4,
    VK_LAYER_SETTING_TYPE_FLOAT32_EXT = 5,
    VK_LAYER_SETTING_TYPE_FLOAT64_EXT = 6,
    VK_LAYER_SETTING_TYPE_STRING_EXT = 7,
} VkLayerSettingTypeEXT;

* 
[VK_LAYER_SETTING_TYPE_BOOL32_EXT](#) specifies that the layer
setting’s type is `VkBool32`.

* 
[VK_LAYER_SETTING_TYPE_INT32_EXT](#) specifies that the layer setting’s
type is signed 32-bit integer.

* 
[VK_LAYER_SETTING_TYPE_INT64_EXT](#) specifies that the layer setting’s
type is signed 64-bit integer.

* 
[VK_LAYER_SETTING_TYPE_UINT32_EXT](#) specifies that the layer
setting’s type is unsigned 32-bit integer.

* 
[VK_LAYER_SETTING_TYPE_UINT64_EXT](#) specifies that the layer
setting’s type is unsigned 64-bit integer.

* 
[VK_LAYER_SETTING_TYPE_FLOAT32_EXT](#) specifies that the layer
setting’s type is 32-bit floating-point.

* 
[VK_LAYER_SETTING_TYPE_FLOAT64_EXT](#) specifies that the layer
setting’s type is 64-bit floating-point.

* 
[VK_LAYER_SETTING_TYPE_STRING_EXT](#) specifies that the layer
setting’s type is a pointer to a null-terminated UTF-8 string.

[VK_EXT_layer_settings](VK_EXT_layer_settings.html), [VkLayerSettingEXT](VkLayerSettingEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/initialization.html#VkLayerSettingTypeEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
