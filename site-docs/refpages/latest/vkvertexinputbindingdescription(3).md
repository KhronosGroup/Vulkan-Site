# VkVertexInputBindingDescription(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVertexInputBindingDescription.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVertexInputBindingDescription - Structure specifying vertex input binding description

Each vertex input binding is specified by the
`VkVertexInputBindingDescription` structure, defined as:

// Provided by VK_VERSION_1_0
typedef struct VkVertexInputBindingDescription {
    uint32_t             binding;
    uint32_t             stride;
    VkVertexInputRate    inputRate;
} VkVertexInputBindingDescription;

* 
`binding` is the binding number that this structure describes.

* 
`stride` is the byte stride between consecutive elements within the
buffer.

* 
`inputRate` is a [VkVertexInputRate](VkVertexInputRate.html) value specifying whether
vertex attribute addressing is a function of the vertex index or of the
instance index.

Valid Usage

* 
[](#VUID-VkVertexInputBindingDescription-binding-00618) VUID-VkVertexInputBindingDescription-binding-00618

`binding` **must** be less than
`VkPhysicalDeviceLimits`::`maxVertexInputBindings`

* 
[](#VUID-VkVertexInputBindingDescription-stride-00619) VUID-VkVertexInputBindingDescription-stride-00619

`stride` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxVertexInputBindingStride`

* 
[](#VUID-VkVertexInputBindingDescription-stride-04456) VUID-VkVertexInputBindingDescription-stride-04456

If the `[VK_KHR_portability_subset](VK_KHR_portability_subset.html)` extension is enabled,
`stride` **must** be a multiple of, and at least as large as,
[VkPhysicalDevicePortabilitySubsetPropertiesKHR](VkPhysicalDevicePortabilitySubsetPropertiesKHR.html)::`minVertexInputBindingStrideAlignment`

Valid Usage (Implicit)

* 
[](#VUID-VkVertexInputBindingDescription-inputRate-parameter) VUID-VkVertexInputBindingDescription-inputRate-parameter

 `inputRate` **must** be a valid [VkVertexInputRate](VkVertexInputRate.html) value

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkPipelineVertexInputStateCreateInfo](VkPipelineVertexInputStateCreateInfo.html), [VkVertexInputRate](VkVertexInputRate.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/fxvertex.html#VkVertexInputBindingDescription).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
