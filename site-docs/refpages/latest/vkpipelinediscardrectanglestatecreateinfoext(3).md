# VkPipelineDiscardRectangleStateCreateInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineDiscardRectangleStateCreateInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineDiscardRectangleStateCreateInfoEXT - Structure specifying discard rectangle

The `VkPipelineDiscardRectangleStateCreateInfoEXT` structure is defined
as:

// Provided by VK_EXT_discard_rectangles
typedef struct VkPipelineDiscardRectangleStateCreateInfoEXT {
    VkStructureType                                  sType;
    const void*                                      pNext;
    VkPipelineDiscardRectangleStateCreateFlagsEXT    flags;
    VkDiscardRectangleModeEXT                        discardRectangleMode;
    uint32_t                                         discardRectangleCount;
    const VkRect2D*                                  pDiscardRectangles;
} VkPipelineDiscardRectangleStateCreateInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`discardRectangleMode` is a [VkDiscardRectangleModeEXT](VkDiscardRectangleModeEXT.html) value
determining whether the discard rectangle test is inclusive or
exclusive.

* 
`discardRectangleCount` is the number of discard rectangles to use.

* 
`pDiscardRectangles` is a pointer to an array of [VkRect2D](VkRect2D.html)
structures defining discard rectangles.

If the [VK_DYNAMIC_STATE_DISCARD_RECTANGLE_EXT](VkDynamicState.html) dynamic state is enabled
for a pipeline, the `pDiscardRectangles` member is ignored.
If the [VK_DYNAMIC_STATE_DISCARD_RECTANGLE_ENABLE_EXT](VkDynamicState.html) dynamic state is
not enabled for the pipeline the presence of this structure in the
[VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html) chain, and a `discardRectangleCount`
greater than zero, implicitly enables discard rectangles in the pipeline,
otherwise discard rectangles **must** enabled or disabled by
[vkCmdSetDiscardRectangleEnableEXT](vkCmdSetDiscardRectangleEnableEXT.html).
If the [VK_DYNAMIC_STATE_DISCARD_RECTANGLE_MODE_EXT](VkDynamicState.html) dynamic state is
enabled for the pipeline, the `discardRectangleMode` member is ignored,
and the discard rectangle mode **must** be set by
[vkCmdSetDiscardRectangleModeEXT](vkCmdSetDiscardRectangleModeEXT.html).

When this structure is included in the `pNext` chain of
[VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html), it defines parameters of the discard
rectangle test.
If the [VK_DYNAMIC_STATE_DISCARD_RECTANGLE_EXT](VkDynamicState.html) dynamic state is not
enabled, and this structure is not included in the `pNext` chain, it is
equivalent to specifying this structure with a `discardRectangleCount`
of `0`.
If all [VK_DYNAMIC_STATE_DISCARD_RECTANGLE_EXT](VkDynamicState.html),
[VK_DYNAMIC_STATE_DISCARD_RECTANGLE_ENABLE_EXT](VkDynamicState.html), and
[VK_DYNAMIC_STATE_DISCARD_RECTANGLE_MODE_EXT](VkDynamicState.html) dynamic states are
enabled, the application **can** omit this structure from the `pNext` chain
of [VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html) and still use discard rectangles by
setting all state dynamically.
In this case `vkCmdSetDiscardRectangleEXT` **must** be called to set the
discard rectangle for all indices [0, `maxDiscardRectangles`)
before drawing with discard rectangles enabled.
Individual discard rectangles **can** be made ineffective by setting their
[VkRect2D](VkRect2D.html)::`extent.width` and [VkRect2D](VkRect2D.html)::`extent.height`
to zero.

Valid Usage

* 
[](#VUID-VkPipelineDiscardRectangleStateCreateInfoEXT-discardRectangleCount-00582) VUID-VkPipelineDiscardRectangleStateCreateInfoEXT-discardRectangleCount-00582

`discardRectangleCount` **must** be less than or equal to
`VkPhysicalDeviceDiscardRectanglePropertiesEXT`::`maxDiscardRectangles`

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineDiscardRectangleStateCreateInfoEXT-sType-sType) VUID-VkPipelineDiscardRectangleStateCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_DISCARD_RECTANGLE_STATE_CREATE_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkPipelineDiscardRectangleStateCreateInfoEXT-flags-zerobitmask) VUID-VkPipelineDiscardRectangleStateCreateInfoEXT-flags-zerobitmask

 `flags` **must** be `0`

* 
[](#VUID-VkPipelineDiscardRectangleStateCreateInfoEXT-discardRectangleMode-parameter) VUID-VkPipelineDiscardRectangleStateCreateInfoEXT-discardRectangleMode-parameter

 `discardRectangleMode` **must** be a valid [VkDiscardRectangleModeEXT](VkDiscardRectangleModeEXT.html) value

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html)

[VK_EXT_discard_rectangles](VK_EXT_discard_rectangles.html), [VkDiscardRectangleModeEXT](VkDiscardRectangleModeEXT.html), [VkPipelineDiscardRectangleStateCreateFlagsEXT](VkPipelineDiscardRectangleStateCreateFlagsEXT.html), [VkRect2D](VkRect2D.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/fragops.html#VkPipelineDiscardRectangleStateCreateInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
