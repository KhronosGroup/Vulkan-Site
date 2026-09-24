# VkPhysicalDeviceShaderUniformBufferUnsizedArrayFeaturesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceShaderUniformBufferUnsizedArrayFeaturesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceShaderUniformBufferUnsizedArrayFeaturesEXT - Structure describing uniform buffer unsized array features that can be supported by an implementation

The `VkPhysicalDeviceShaderUniformBufferUnsizedArrayFeaturesEXT`
structure is defined as:

// Provided by VK_EXT_shader_uniform_buffer_unsized_array
typedef struct VkPhysicalDeviceShaderUniformBufferUnsizedArrayFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           shaderUniformBufferUnsizedArray;
} VkPhysicalDeviceShaderUniformBufferUnsizedArrayFeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`shaderUniformBufferUnsizedArray` indicates that the implementation
supports declaring the last member of a uniform buffer block as an
unsized array.

If the `VkPhysicalDeviceShaderUniformBufferUnsizedArrayFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceShaderUniformBufferUnsizedArrayFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderUniformBufferUnsizedArrayFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceShaderUniformBufferUnsizedArrayFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_UNIFORM_BUFFER_UNSIZED_ARRAY_FEATURES_EXT](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_EXT_shader_uniform_buffer_unsized_array](VK_EXT_shader_uniform_buffer_unsized_array.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceShaderUniformBufferUnsizedArrayFeaturesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
