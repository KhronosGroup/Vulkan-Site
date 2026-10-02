# VK_AMD_shader_early_and_late_fragment_tests(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_AMD_shader_early_and_late_fragment_tests.html

## Table of Contents

- [Name](#_name)
- [VK_AMD_shader_early_and_late_fragment_tests](#VK_AMD_shader_early_and_late_fragment_tests)
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

VK_AMD_shader_early_and_late_fragment_tests - device extension

**Name String**

`VK_AMD_shader_early_and_late_fragment_tests`

**Extension Type**

Device extension

**Registered Extension Number**

322

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**SPIR-V Dependencies**

* 
[SPV_AMD_shader_early_and_late_fragment_tests](https://github.khronos.org/SPIRV-Registry/extensions/AMD/SPV_AMD_shader_early_and_late_fragment_tests.html)

**Contact**

* 
Tobias Hector [tobski](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_AMD_shader_early_and_late_fragment_tests] @tobski%0A*Here describe the issue or question you have about the VK_AMD_shader_early_and_late_fragment_tests extension*)

**Extension Proposal**

[VK_AMD_shader_early_and_late_fragment_tests](../../../../features/latest/features/proposals/VK_AMD_shader_early_and_late_fragment_tests.html)

**Last Modified Date**

2021-09-14

**Interactions and External Dependencies**

* 
This extension interacts with `[VK_EXT_shader_stencil_export](VK_EXT_shader_stencil_export.html)`

**Contributors**

* 
Tobias Hector, AMD

This extension adds support for the
[`SPV_AMD_shader_early_and_late_fragment_tests`](https://github.khronos.org/SPIRV-Registry/extensions/AMD/SPV_AMD_shader_early_and_late_fragment_tests.html)
extension, allowing shaders to explicitly opt in to allowing both early
*and* late fragment tests with the `EarlyAndLateFragmentTestsAMD`
execution mode.

If the `[VK_EXT_shader_stencil_export](VK_EXT_shader_stencil_export.html)` extension is supported,
additional execution modes allowing early depth tests similar to
`DepthUnchanged`, `DepthLess`, and `DepthGreater` are provided.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceShaderEarlyAndLateFragmentTestsFeaturesAMD](VkPhysicalDeviceShaderEarlyAndLateFragmentTestsFeaturesAMD.html)

* 
`VK_AMD_SHADER_EARLY_AND_LATE_FRAGMENT_TESTS_EXTENSION_NAME`

* 
`VK_AMD_SHADER_EARLY_AND_LATE_FRAGMENT_TESTS_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_EARLY_AND_LATE_FRAGMENT_TESTS_FEATURES_AMD](VkStructureType.html)

* 
Revision 1, 2021-09-14 (Tobias Hector)

Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_AMD_shader_early_and_late_fragment_tests).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
