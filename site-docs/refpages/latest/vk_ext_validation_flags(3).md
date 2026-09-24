# VK_EXT_validation_flags(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_validation_flags.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_validation_flags](#VK_EXT_validation_flags)
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

VK_EXT_validation_flags - instance extension

**Name String**

`VK_EXT_validation_flags`

**Extension Type**

Instance extension

**Registered Extension Number**

62

**Revision**

3

**Ratification Status**

Not ratified

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
Tobin Ehlis [tobine](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_validation_flags] @tobine%0A*Here describe the issue or question you have about the VK_EXT_validation_flags extension*)

**Last Modified Date**

2019-08-19

**IP Status**

No known IP claims.

**Contributors**

* 
Tobin Ehlis, Google

* 
Courtney Goeltzenleuchter, Google

This extension provides the [VkValidationFlagsEXT](VkValidationFlagsEXT.html) structure that can be
included in the `pNext` chain of the [VkInstanceCreateInfo](VkInstanceCreateInfo.html)
structure passed as the `pCreateInfo` parameter of
[vkCreateInstance](vkCreateInstance.html).
The structure contains an array of [VkValidationCheckEXT](VkValidationCheckEXT.html) values that
will be disabled by the validation layers.

Functionality in this extension is subsumed into the
`[VK_EXT_layer_settings](VK_EXT_layer_settings.html)` extension.

* 
Extending [VkInstanceCreateInfo](VkInstanceCreateInfo.html):

[VkValidationFlagsEXT](VkValidationFlagsEXT.html)

* 
[VkValidationCheckEXT](VkValidationCheckEXT.html)

* 
`VK_EXT_VALIDATION_FLAGS_EXTENSION_NAME`

* 
`VK_EXT_VALIDATION_FLAGS_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_VALIDATION_FLAGS_EXT](VkStructureType.html)

* 
Revision 3, 2023-09-25 (Christophe Riccio)

Marked as deprecated by VK_EXT_layer_settings

Revision 2, 2019-08-19 (Mark Lobodzinski)

* 
Marked as deprecated by VK_EXT_validation_features

Revision 1, 2016-08-26 (Courtney Goeltzenleuchter)

* 
Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_validation_flags).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
