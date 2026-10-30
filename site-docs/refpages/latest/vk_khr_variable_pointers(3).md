# VK_KHR_variable_pointers(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_variable_pointers.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_variable_pointers](#VK_KHR_variable_pointers)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [Promotion to Vulkan 1.1](#_promotion_to_vulkan_1_1)
- [Promotion_to_Vulkan_1.1](#_promotion_to_vulkan_1_1)
- [Promotion to Vulkan 1.4](#_promotion_to_vulkan_1_4)
- [Promotion_to_Vulkan_1.4](#_promotion_to_vulkan_1_4)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [New SPIR-V Capabilities](#_new_spir_v_capabilities)
- [New_SPIR-V_Capabilities](#_new_spir_v_capabilities)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_variable_pointers - device extension

**Name String**

`VK_KHR_variable_pointers`

**Extension Type**

Device extension

**Registered Extension Number**

121

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

     [VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

     and

     [VK_KHR_storage_buffer_storage_class](VK_KHR_storage_buffer_storage_class.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**SPIR-V Dependencies**

* 
[SPV_KHR_variable_pointers](https://github.khronos.org/SPIRV-Registry/extensions/KHR/SPV_KHR_variable_pointers.html)

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1-promotions)

**Contact**

* 
Jesse Hall [critsec](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_variable_pointers] @critsec%0A*Here describe the issue or question you have about the VK_KHR_variable_pointers extension*)

**Last Modified Date**

2017-09-05

**IP Status**

No known IP claims.

**Contributors**

* 
John Kessenich, Google

* 
Neil Henning, Codeplay

* 
David Neto, Google

* 
Daniel Koch, Nvidia

* 
Graeme Leese, Broadcom

* 
Weifeng Zhang, Qualcomm

* 
Stephen Clarke, Imagination Technologies

* 
Faith Ekstrand, Intel

* 
Jesse Hall, Google

The `VK_KHR_variable_pointers` extension allows implementations to indicate
their level of support for the `SPV_KHR_variable_pointers` SPIR-V extension.
The SPIR-V extension allows shader modules to use invocation-private
pointers into uniform and/or storage buffers, where the pointer values can
be dynamic and non-uniform.

The `SPV_KHR_variable_pointers` extension introduces two capabilities.
The first, `VariablePointersStorageBuffer`, **must** be supported by all
implementations of this extension.
The second, `VariablePointers`, is optional.

All functionality in this extension is included in core Vulkan 1.1, with the
KHR suffix omitted, however support for the
[`variablePointersStorageBuffer`](../../../../spec/latest/chapters/features.html#features-variablePointersStorageBuffer) feature is made optional.
The original type, enum, and command names are still available as aliases of
the core functionality.

If Vulkan 1.4 is supported, support for the [`variablePointers`](../../../../spec/latest/chapters/features.html#features-variablePointers) and [`variablePointersStorageBuffer`](../../../../spec/latest/chapters/features.html#features-variablePointersStorageBuffer) features is required.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceVariablePointerFeaturesKHR](VkPhysicalDeviceVariablePointersFeatures.html)

* 
[VkPhysicalDeviceVariablePointersFeaturesKHR](VkPhysicalDeviceVariablePointersFeatures.html)

* 
`VK_KHR_VARIABLE_POINTERS_EXTENSION_NAME`

* 
`VK_KHR_VARIABLE_POINTERS_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VARIABLE_POINTERS_FEATURES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VARIABLE_POINTER_FEATURES_KHR](VkStructureType.html)

* 
[`VariablePointers`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-VariablePointers)

* 
[    `VariablePointersStorageBuffer`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-VariablePointersStorageBuffer)

1) Do we need an optional property for the SPIR-V
`VariablePointersStorageBuffer` capability or should it be mandatory when
this extension is advertised?

**RESOLVED**: Add it as a distinct feature, but make support mandatory.
Adding it as a feature makes the extension easier to include in a future
core API version.
In the extension, the feature is mandatory, so that presence of the
extension guarantees some functionality.
When included in a core API version, the feature would be optional.

2) Can support for these capabilities vary between shader stages?

**RESOLVED**: No, if the capability is supported in any stage it must be
supported in all stages.

3) Should the capabilities be features or limits?

**RESOLVED**: Features, primarily for consistency with other similar
extensions.

* 
Revision 1, 2017-03-14 (Jesse Hall and John Kessenich)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_variable_pointers).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
