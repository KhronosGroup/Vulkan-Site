# VkSubpassResolvePerformanceQueryEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSubpassResolvePerformanceQueryEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSubpassResolvePerformanceQueryEXT - Structure specifying the efficiency of subpass resolve for an attachment with a format

To query the performance characteristics of a [subpass resolve](../../../../spec/latest/chapters/renderpass.html#renderpass-subpass) operation for an attachment with a [VkFormat](VkFormat.html), add a
[VkSubpassResolvePerformanceQueryEXT](#) structure to the `pNext` chain
of [VkFormatProperties2](VkFormatProperties2.html).

The [VkSubpassResolvePerformanceQueryEXT](#) structure is defined as:

// Provided by VK_EXT_multisampled_render_to_single_sampled
typedef struct VkSubpassResolvePerformanceQueryEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           optimal;
} VkSubpassResolvePerformanceQueryEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`optimal` specifies that a subpass resolve operation is optimally
performed.

If `optimal` is [VK_FALSE](VK_FALSE.html) for a [VkFormat](VkFormat.html), using a subpass
resolve operation on a multisampled attachment with this format can incur
additional costs, including additional memory bandwidth usage and a higher
memory footprint.
If an attachment with such a format is used in a
[multisampled-render-to-single-sampled](../../../../spec/latest/chapters/renderpass.html#subpass-multisampledrendertosinglesampled)
subpass, the additional memory and memory bandwidth usage can nullify the
benefits of using the `[VK_EXT_multisampled_render_to_single_sampled](VK_EXT_multisampled_render_to_single_sampled.html)`
extension.

Valid Usage (Implicit)

* 
[](#VUID-VkSubpassResolvePerformanceQueryEXT-sType-sType) VUID-VkSubpassResolvePerformanceQueryEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SUBPASS_RESOLVE_PERFORMANCE_QUERY_EXT](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkFormatProperties2](VkFormatProperties2.html)

[VK_EXT_multisampled_render_to_single_sampled](VK_EXT_multisampled_render_to_single_sampled.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/formats.html#VkSubpassResolvePerformanceQueryEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
