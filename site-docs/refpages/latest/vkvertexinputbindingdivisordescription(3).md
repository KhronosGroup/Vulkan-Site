# VkVertexInputBindingDivisorDescription(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVertexInputBindingDivisorDescription.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVertexInputBindingDivisorDescription - Structure specifying a divisor used in instanced rendering

The individual divisor values per binding are specified using the
`VkVertexInputBindingDivisorDescription` structure which is defined as:

// Provided by VK_VERSION_1_4
typedef struct VkVertexInputBindingDivisorDescription {
    uint32_t    binding;
    uint32_t    divisor;
} VkVertexInputBindingDivisorDescription;

// Provided by VK_KHR_vertex_attribute_divisor
// Equivalent to VkVertexInputBindingDivisorDescription
typedef VkVertexInputBindingDivisorDescription VkVertexInputBindingDivisorDescriptionKHR;

// Provided by VK_EXT_vertex_attribute_divisor
// Equivalent to VkVertexInputBindingDivisorDescription
typedef VkVertexInputBindingDivisorDescription VkVertexInputBindingDivisorDescriptionEXT;

* 
`binding` is the binding number for which the divisor is specified.

* 
`divisor` is the number of successive instances that will use the
same value of the vertex attribute when instanced rendering is enabled.
For example, if the divisor is N, the same vertex attribute will be
applied to N successive instances before moving on to the next vertex
attribute.
The maximum value of `divisor` is implementation-dependent and can
be queried using
[VkPhysicalDeviceVertexAttributeDivisorProperties](VkPhysicalDeviceVertexAttributeDivisorProperties.html)::`maxVertexAttribDivisor`.
A value of `0` **can** be used for the divisor if the
[    `vertexAttributeInstanceRateZeroDivisor`](../../../../spec/latest/chapters/features.html#features-vertexAttributeInstanceRateZeroDivisor) feature is enabled.
In this case, the same vertex attribute will be applied to all
instances.

If this structure is not used to define a divisor value for an attribute,
then the divisor has a logical default value of 1.

Valid Usage

* 
[](#VUID-VkVertexInputBindingDivisorDescription-binding-01869) VUID-VkVertexInputBindingDivisorDescription-binding-01869

`binding` **must** be less than
[VkPhysicalDeviceLimits](VkPhysicalDeviceLimits.html)::`maxVertexInputBindings`

* 
[](#VUID-VkVertexInputBindingDivisorDescription-vertexAttributeInstanceRateZeroDivisor-02228) VUID-VkVertexInputBindingDivisorDescription-vertexAttributeInstanceRateZeroDivisor-02228

If the [    `vertexAttributeInstanceRateZeroDivisor`](../../../../spec/latest/chapters/features.html#features-vertexAttributeInstanceRateZeroDivisor) feature is not enabled,
`divisor` **must** not be `0`

* 
[](#VUID-VkVertexInputBindingDivisorDescription-vertexAttributeInstanceRateDivisor-02229) VUID-VkVertexInputBindingDivisorDescription-vertexAttributeInstanceRateDivisor-02229

If the [    `vertexAttributeInstanceRateDivisor`](../../../../spec/latest/chapters/features.html#features-vertexAttributeInstanceRateDivisor) feature is not enabled,
`divisor` **must** be `1`

* 
[](#VUID-VkVertexInputBindingDivisorDescription-divisor-01870) VUID-VkVertexInputBindingDivisorDescription-divisor-01870

`divisor` **must** be a value between `0` and
[VkPhysicalDeviceVertexAttributeDivisorProperties](VkPhysicalDeviceVertexAttributeDivisorProperties.html)::`maxVertexAttribDivisor`,
inclusive

* 
[](#VUID-VkVertexInputBindingDivisorDescription-inputRate-01871) VUID-VkVertexInputBindingDivisorDescription-inputRate-01871

[VkVertexInputBindingDescription](VkVertexInputBindingDescription.html)::`inputRate` **must** be of type
[VK_VERTEX_INPUT_RATE_INSTANCE](VkVertexInputRate.html) for this `binding`

[VK_EXT_vertex_attribute_divisor](VK_EXT_vertex_attribute_divisor.html), [VK_KHR_vertex_attribute_divisor](VK_KHR_vertex_attribute_divisor.html), [VK_VERSION_1_4](VK_VERSION_1_4.html), [VkPipelineVertexInputDivisorStateCreateInfo](VkPipelineVertexInputDivisorStateCreateInfo.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/fxvertex.html#VkVertexInputBindingDivisorDescription).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
