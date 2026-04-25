# VkVertexInputBindingDescription2EXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVertexInputBindingDescription2EXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVertexInputBindingDescription2EXT - Structure specifying the extended vertex input binding description

The `VkVertexInputBindingDescription2EXT` structure is defined as:

// Provided by VK_EXT_shader_object, VK_EXT_vertex_input_dynamic_state
typedef struct VkVertexInputBindingDescription2EXT {
    VkStructureType      sType;
    void*                pNext;
    uint32_t             binding;
    uint32_t             stride;
    VkVertexInputRate    inputRate;
    uint32_t             divisor;
} VkVertexInputBindingDescription2EXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`binding` is the binding number that this structure describes.

* 
`stride` is the byte stride between consecutive elements within the
buffer.

* 
`inputRate` is a [VkVertexInputRate](VkVertexInputRate.html) value specifying whether
vertex attribute addressing is a function of the vertex index or of the
instance index.

* 
`divisor` is the number of successive instances that will use the
same value of the vertex attribute when instanced rendering is enabled.
This member **can** be a value other than `1` if the
[    `vertexAttributeInstanceRateDivisor`](../../../../spec/latest/chapters/features.html#features-vertexAttributeInstanceRateDivisor) feature is enabled.
For example, if the divisor is N, the same vertex attribute will be
applied to N successive instances before moving on to the next vertex
attribute.
The maximum value of `divisor` is implementation-dependent and can
be queried using
`VkPhysicalDeviceVertexAttributeDivisorPropertiesEXT`::`maxVertexAttribDivisor`.
A value of `0` **can** be used for the divisor if the
[    `vertexAttributeInstanceRateZeroDivisor`](../../../../spec/latest/chapters/features.html#features-vertexAttributeInstanceRateZeroDivisor) feature is enabled.
In this case, the same vertex attribute will be applied to all
instances.

Valid Usage

* 
[](#VUID-VkVertexInputBindingDescription2EXT-binding-04796) VUID-VkVertexInputBindingDescription2EXT-binding-04796

`binding` **must** be less than
`VkPhysicalDeviceLimits`::`maxVertexInputBindings`

* 
[](#VUID-VkVertexInputBindingDescription2EXT-stride-04797) VUID-VkVertexInputBindingDescription2EXT-stride-04797

`stride` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxVertexInputBindingStride`

* 
[](#VUID-VkVertexInputBindingDescription2EXT-divisor-04798) VUID-VkVertexInputBindingDescription2EXT-divisor-04798

If the [    `vertexAttributeInstanceRateZeroDivisor`](../../../../spec/latest/chapters/features.html#features-vertexAttributeInstanceRateZeroDivisor) feature is not enabled,
`divisor` **must** not be `0`

* 
[](#VUID-VkVertexInputBindingDescription2EXT-divisor-04799) VUID-VkVertexInputBindingDescription2EXT-divisor-04799

If the [    `vertexAttributeInstanceRateDivisor`](../../../../spec/latest/chapters/features.html#features-vertexAttributeInstanceRateDivisor) feature is not enabled,
`divisor` **must** be `1`

* 
[](#VUID-VkVertexInputBindingDescription2EXT-divisor-06226) VUID-VkVertexInputBindingDescription2EXT-divisor-06226

`divisor` **must** be a value between `0` and
`VkPhysicalDeviceVertexAttributeDivisorPropertiesEXT`::`maxVertexAttribDivisor`,
inclusive

* 
[](#VUID-VkVertexInputBindingDescription2EXT-divisor-06227) VUID-VkVertexInputBindingDescription2EXT-divisor-06227

If `divisor` is not `1` then `inputRate` **must** be of type
[VK_VERTEX_INPUT_RATE_INSTANCE](VkVertexInputRate.html)

Valid Usage (Implicit)

* 
[](#VUID-VkVertexInputBindingDescription2EXT-sType-sType) VUID-VkVertexInputBindingDescription2EXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VERTEX_INPUT_BINDING_DESCRIPTION_2_EXT](VkStructureType.html)

* 
[](#VUID-VkVertexInputBindingDescription2EXT-inputRate-parameter) VUID-VkVertexInputBindingDescription2EXT-inputRate-parameter

 `inputRate` **must** be a valid [VkVertexInputRate](VkVertexInputRate.html) value

[VK_EXT_shader_object](VK_EXT_shader_object.html), [VK_EXT_vertex_input_dynamic_state](VK_EXT_vertex_input_dynamic_state.html), [VkStructureType](VkStructureType.html), [VkVertexInputRate](VkVertexInputRate.html), [vkCmdSetVertexInputEXT](vkCmdSetVertexInputEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/fxvertex.html#VkVertexInputBindingDescription2EXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
