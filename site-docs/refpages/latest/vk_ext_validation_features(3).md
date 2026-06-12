# VK_EXT_validation_features(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_validation_features.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_validation_features](#VK_EXT_validation_features)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [Deprecation by VK_EXT_layer_settings](#_deprecation_by_vk_ext_layer_settings)
- [Deprecation_by_VK_EXT_layer_settings](#_deprecation_by_vk_ext_layer_settings)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_validation_features - instance extension

**Name String**

`VK_EXT_validation_features`

**Extension Type**

Instance extension

**Registered Extension Number**

248

**Revision**

6

**Ratification Status**

Ratified

**Extension and Version Dependencies**

None

**Deprecation State**

* 
*Deprecated* by
[VK_EXT_layer_settings](VK_EXT_layer_settings.html)
extension

**Special Use**

* 
[Debugging tools](../../../../spec/latest/chapters/extensions.html#extendingvulkan-compatibility-specialuse)

**Contact**

* 
Karl Schultz [karl-lunarg](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_validation_features] @karl-lunarg%0A*Here describe the issue or question you have about the VK_EXT_validation_features extension*)

**Last Modified Date**

2018-11-14

**IP Status**

No known IP claims.

**Contributors**

* 
Karl Schultz, LunarG

* 
Dave Houlton, LunarG

* 
Mark Lobodzinski, LunarG

* 
Camden Stocker, LunarG

* 
Tony Barbour, LunarG

* 
John Zulauf, LunarG

This extension provides the [VkValidationFeaturesEXT](VkValidationFeaturesEXT.html) structure that can
be included in the `pNext` chain of the [VkInstanceCreateInfo](VkInstanceCreateInfo.html)
structure passed as the `pCreateInfo` parameter of
[vkCreateInstance](vkCreateInstance.html).
The structure contains an array of [VkValidationFeatureEnableEXT](VkValidationFeatureEnableEXT.html) enum
values that enable specific validation features that are disabled by
default.
The structure also contains an array of [VkValidationFeatureDisableEXT](VkValidationFeatureDisableEXT.html)
enum values that disable specific validation layer features that are enabled
by default.

Functionality in this extension is subsumed into the
`[VK_EXT_layer_settings](VK_EXT_layer_settings.html)` extension.

* 
Extending [VkInstanceCreateInfo](VkInstanceCreateInfo.html), [VkShaderModuleCreateInfo](VkShaderModuleCreateInfo.html), [VkShaderCreateInfoEXT](VkShaderCreateInfoEXT.html):

[VkValidationFeaturesEXT](VkValidationFeaturesEXT.html)

* 
[VkValidationFeatureDisableEXT](VkValidationFeatureDisableEXT.html)

* 
[VkValidationFeatureEnableEXT](VkValidationFeatureEnableEXT.html)

* 
`VK_EXT_VALIDATION_FEATURES_EXTENSION_NAME`

* 
`VK_EXT_VALIDATION_FEATURES_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_VALIDATION_FEATURES_EXT](VkStructureType.html)

* 
Revision 1, 2018-11-14 (Karl Schultz)

Initial revision

Revision 2, 2019-08-06 (Mark Lobodzinski)

* 
Add Best Practices enable

Revision 3, 2020-03-04 (Tony Barbour)

* 
Add Debug Printf enable

Revision 4, 2020-07-29 (John Zulauf)

* 
Add Synchronization Validation enable

Revision 5, 2021-05-18 (Tony Barbour)

* 
Add Shader Validation Cache disable

Revision 6, 2023-09-25 (Christophe Riccio)

* 
Marked as deprecated by VK_EXT_layer_settings

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_validation_features).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
