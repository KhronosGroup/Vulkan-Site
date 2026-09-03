# VkVertexInputAttributeDescription(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVertexInputAttributeDescription.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVertexInputAttributeDescription - Structure specifying vertex input attribute description

Each vertex input attribute is specified by the
`VkVertexInputAttributeDescription` structure, defined as:

// Provided by VK_VERSION_1_0
typedef struct VkVertexInputAttributeDescription {
    uint32_t    location;
    uint32_t    binding;
    VkFormat    format;
    uint32_t    offset;
} VkVertexInputAttributeDescription;

* 
`location` is the shader input location number for this attribute.

* 
`binding` is the binding number which this attribute takes its data
from.

* 
`format` is the size and type of the vertex attribute data.

* 
`offset` is a byte offset of this attribute relative to the start of
an element in the vertex input binding.

Valid Usage

* 
[](#VUID-VkVertexInputAttributeDescription-location-00620) VUID-VkVertexInputAttributeDescription-location-00620

`location` **must** be less than
`VkPhysicalDeviceLimits`::`maxVertexInputAttributes`

* 
[](#VUID-VkVertexInputAttributeDescription-binding-00621) VUID-VkVertexInputAttributeDescription-binding-00621

`binding` **must** be less than
`VkPhysicalDeviceLimits`::`maxVertexInputBindings`

* 
[](#VUID-VkVertexInputAttributeDescription-offset-00622) VUID-VkVertexInputAttributeDescription-offset-00622

`offset` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxVertexInputAttributeOffset`

* 
[](#VUID-VkVertexInputAttributeDescription-format-00623) VUID-VkVertexInputAttributeDescription-format-00623

The [format features](../../../../spec/latest/chapters/resources.html#resources-buffer-view-format-features) of
`format` **must** contain [VK_FORMAT_FEATURE_VERTEX_BUFFER_BIT](VkFormatFeatureFlagBits.html)

* 
[](#VUID-VkVertexInputAttributeDescription-vertexAttributeAccessBeyondStride-04457) VUID-VkVertexInputAttributeDescription-vertexAttributeAccessBeyondStride-04457

If the `[VK_KHR_portability_subset](VK_KHR_portability_subset.html)` extension is enabled, and
[VkPhysicalDevicePortabilitySubsetFeaturesKHR](VkPhysicalDevicePortabilitySubsetFeaturesKHR.html)::`vertexAttributeAccessBeyondStride`
is [VK_FALSE](VK_FALSE.html), the sum of `offset` plus the size of the vertex
attribute data described by `format` **must** not be greater than
`stride` in the [VkVertexInputBindingDescription](VkVertexInputBindingDescription.html) referenced in
`binding`

Valid Usage (Implicit)

* 
[](#VUID-VkVertexInputAttributeDescription-format-parameter) VUID-VkVertexInputAttributeDescription-format-parameter

 `format` **must** be a valid [VkFormat](VkFormat.html) value

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkFormat](VkFormat.html), [VkPipelineVertexInputStateCreateInfo](VkPipelineVertexInputStateCreateInfo.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/fxvertex.html#VkVertexInputAttributeDescription).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
