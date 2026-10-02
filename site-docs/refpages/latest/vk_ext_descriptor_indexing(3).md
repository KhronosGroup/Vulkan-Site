# VK_EXT_descriptor_indexing(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_descriptor_indexing.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_descriptor_indexing](#VK_EXT_descriptor_indexing)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [Promotion to Vulkan 1.2](#_promotion_to_vulkan_1_2)
- [Promotion_to_Vulkan_1.2](#_promotion_to_vulkan_1_2)
- [Promotion to Vulkan 1.4](#_promotion_to_vulkan_1_4)
- [Promotion_to_Vulkan_1.4](#_promotion_to_vulkan_1_4)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_descriptor_indexing - device extension

**Name String**

`VK_EXT_descriptor_indexing`

**Extension Type**

Device extension

**Registered Extension Number**

162

**Revision**

2

**Ratification Status**

Ratified

**Extension and Version Dependencies**

     [VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

     and

     [VK_KHR_maintenance3](VK_KHR_maintenance3.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**SPIR-V Dependencies**

* 
[SPV_EXT_descriptor_indexing](https://github.khronos.org/SPIRV-Registry/extensions/EXT/SPV_EXT_descriptor_indexing.html)

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.2](../../../../spec/latest/appendices/versions.html#versions-1.2-promotions)

**Contact**

* 
Jeff Bolz [jeffbolznv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_descriptor_indexing] @jeffbolznv%0A*Here describe the issue or question you have about the VK_EXT_descriptor_indexing extension*)

**Last Modified Date**

2017-10-02

**Interactions and External Dependencies**

* 
This extension provides API support for
[`GL_EXT_nonuniform_qualifier`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/ext/GL_EXT_nonuniform_qualifier.txt)

**Contributors**

* 
Jeff Bolz, NVIDIA

* 
Daniel Rakos, AMD

* 
Slawomir Grajewski, Intel

* 
Tobias Hector, Imagination Technologies

This extension adds several small features which together enable
applications to create large descriptor sets containing substantially all of
their resources, and selecting amongst those resources with dynamic
(non-uniform) indexes in the shader.
There are feature enables and SPIR-V capabilities for non-uniform descriptor
indexing in the shader, and non-uniform indexing in the shader requires use
of a new `NonUniformEXT` decoration defined in the
`SPV_EXT_descriptor_indexing` SPIR-V extension.
There are descriptor set layout binding creation flags enabling several
features:

* 
Descriptors can be updated after they are bound to a command buffer,
such that the execution of the command buffer reflects the most recent
update to the descriptors.

* 
Descriptors that are not used by any pending command buffers can be
updated, which enables writing new descriptors for frame N+1 while frame
N is executing.

* 
Relax the requirement that all descriptors in a binding that is
“statically used” must be valid, such that descriptors that are not
accessed by a submission need not be valid and can be updated while that
submission is executing.

* 
The final binding in a descriptor set layout can have a variable size
(and unsized arrays of resources are allowed in the
`GL_EXT_nonuniform_qualifier` and `SPV_EXT_descriptor_indexing`
extensions).

Note that it is valid for multiple descriptor arrays in a shader to use the
same set and binding number, as long as they are all compatible with the
descriptor type in the pipeline layout.
This means a single array binding in the descriptor set can serve multiple
texture dimensionalities, or an array of buffer descriptors can be used with
multiple different block layouts.

There are new descriptor set layout and descriptor pool creation flags that
are required to opt in to the update-after-bind functionality, and there are
separate `maxPerStage`* and `maxDescriptorSet`* limits that apply to
these descriptor set layouts which **may** be much higher than the pre-existing
limits.
The old limits only count descriptors in non-updateAfterBind descriptor set
layouts, and the new limits count descriptors in all descriptor set layouts
in the pipeline layout.

Vulkan APIs in this extension are included in core Vulkan 1.2, with the EXT
suffix omitted.
However, if Vulkan 1.2 is supported and this extension is not, the
`descriptorIndexing` capability is optional.
External interactions defined by this extension, such as SPIR-V token names,
retain their original names.
The original Vulkan API names are still available as aliases of the core
functionality.

If Vulkan 1.4 is supported, support for the
`shaderUniformTexelBufferArrayDynamicIndexing` and
`shaderStorageTexelBufferArrayDynamicIndexing` capabilities is required.

* 
Extending [VkDescriptorSetAllocateInfo](VkDescriptorSetAllocateInfo.html):

[VkDescriptorSetVariableDescriptorCountAllocateInfoEXT](VkDescriptorSetVariableDescriptorCountAllocateInfo.html)

Extending [VkDescriptorSetLayoutCreateInfo](VkDescriptorSetLayoutCreateInfo.html):

* 
[VkDescriptorSetLayoutBindingFlagsCreateInfoEXT](VkDescriptorSetLayoutBindingFlagsCreateInfo.html)

Extending [VkDescriptorSetLayoutSupport](VkDescriptorSetLayoutSupport.html):

* 
[VkDescriptorSetVariableDescriptorCountLayoutSupportEXT](VkDescriptorSetVariableDescriptorCountLayoutSupport.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDeviceDescriptorIndexingFeaturesEXT](VkPhysicalDeviceDescriptorIndexingFeatures.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceDescriptorIndexingPropertiesEXT](VkPhysicalDeviceDescriptorIndexingProperties.html)

* 
[VkDescriptorBindingFlagBitsEXT](VkDescriptorBindingFlagBits.html)

* 
[VkDescriptorBindingFlagsEXT](VkDescriptorBindingFlags.html)

* 
`VK_EXT_DESCRIPTOR_INDEXING_EXTENSION_NAME`

* 
`VK_EXT_DESCRIPTOR_INDEXING_SPEC_VERSION`

* 
Extending [VkDescriptorBindingFlagBits](VkDescriptorBindingFlagBits.html):

[VK_DESCRIPTOR_BINDING_PARTIALLY_BOUND_BIT_EXT](VkDescriptorBindingFlagBits.html)

* 
[VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT_EXT](VkDescriptorBindingFlagBits.html)

* 
[VK_DESCRIPTOR_BINDING_UPDATE_UNUSED_WHILE_PENDING_BIT_EXT](VkDescriptorBindingFlagBits.html)

* 
[VK_DESCRIPTOR_BINDING_VARIABLE_DESCRIPTOR_COUNT_BIT_EXT](VkDescriptorBindingFlagBits.html)

Extending [VkDescriptorPoolCreateFlagBits](VkDescriptorPoolCreateFlagBits.html):

* 
[VK_DESCRIPTOR_POOL_CREATE_UPDATE_AFTER_BIND_BIT_EXT](VkDescriptorPoolCreateFlagBits.html)

Extending [VkDescriptorSetLayoutCreateFlagBits](VkDescriptorSetLayoutCreateFlagBits.html):

* 
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT_EXT](VkDescriptorSetLayoutCreateFlagBits.html)

Extending [VkResult](VkResult.html):

* 
[VK_ERROR_FRAGMENTATION_EXT](VkResult.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_DESCRIPTOR_SET_LAYOUT_BINDING_FLAGS_CREATE_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DESCRIPTOR_SET_VARIABLE_DESCRIPTOR_COUNT_ALLOCATE_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DESCRIPTOR_SET_VARIABLE_DESCRIPTOR_COUNT_LAYOUT_SUPPORT_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DESCRIPTOR_INDEXING_FEATURES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DESCRIPTOR_INDEXING_PROPERTIES_EXT](VkStructureType.html)

* 
Revision 1, 2017-07-26 (Jeff Bolz)

Internal revisions

Revision 2, 2017-10-02 (Jeff Bolz)

* 
???

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_descriptor_indexing).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
