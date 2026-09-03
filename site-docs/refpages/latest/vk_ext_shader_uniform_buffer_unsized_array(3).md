# VK_EXT_shader_uniform_buffer_unsized_array(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_shader_uniform_buffer_unsized_array.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_shader_uniform_buffer_unsized_array](#VK_EXT_shader_uniform_buffer_unsized_array)
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

VK_EXT_shader_uniform_buffer_unsized_array - device extension

**Name String**

`VK_EXT_shader_uniform_buffer_unsized_array`

**Extension Type**

Device extension

**Registered Extension Number**

643

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Contact**

* 
Piers Daniell [pdaniell-nv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_shader_uniform_buffer_unsized_array] @pdaniell-nv%0A*Here describe the issue or question you have about the VK_EXT_shader_uniform_buffer_unsized_array extension*)

**Extension Proposal**

[VK_EXT_shader_uniform_buffer_unsized_array](../../../../features/latest/features/proposals/VK_EXT_shader_uniform_buffer_unsized_array.html)

**Last Modified Date**

2025-05-28

**Contributors**

* 
Pat Brown, NVIDIA

* 
Jeff Bolz, NVIDIA

* 
Pranjal Dubey, NVIDIA

This extension allows the last member of a uniform buffer block to be
declared as an unsized array.
This capability enables applications to create flexible buffer layouts where
the array size can vary based on runtime requirements.

When the last member of a uniform buffer block is declared as an unsized
array, the effective array size is inferred at runtime from the size of the
buffer object backing the uniform buffer block.
Such unsized arrays can be indexed with general integer expressions, but may
not be passed as arguments to functions or indexed with negative constant
expressions.

This extension leverages existing SPIR-V capabilities, allowing use of
`OpTypeRuntimeArray` as the last member of a uniform buffer block structure
while prohibiting `OpArrayLength`.

Applications needing to know array sizes at runtime should calculate the
length and pass it to shaders via a separate uniform.
This calculation can be performed using the formula: max((buffer_object_size -
offset_of_array) / stride_of_array, 0), where buffer_object_size is the size
of the bound buffer, offset_of_array is the byte offset of the array in the
block, and stride_of_array is the byte stride between consecutive array
elements.

Uniform buffers have traditionally required explicit sizes for all arrays
which limits flexibility.
With this extension, developers can create a single shader that adapts to
different data set sizes at runtime by binding differently sized buffers.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceShaderUniformBufferUnsizedArrayFeaturesEXT](VkPhysicalDeviceShaderUniformBufferUnsizedArrayFeaturesEXT.html)

* 
`VK_EXT_SHADER_UNIFORM_BUFFER_UNSIZED_ARRAY_EXTENSION_NAME`

* 
`VK_EXT_SHADER_UNIFORM_BUFFER_UNSIZED_ARRAY_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_UNIFORM_BUFFER_UNSIZED_ARRAY_FEATURES_EXT](VkStructureType.html)

* 
Revision 1, 2025-05-28 (Pranjal Dubey)

Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_shader_uniform_buffer_unsized_array).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
