# VkOpticalFlowSessionCreateInfoNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkOpticalFlowSessionCreateInfoNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkOpticalFlowSessionCreateInfoNV - Structure specifying parameters of a newly created optical flow session

The [VkOpticalFlowSessionCreateInfoNV](#) structure is defined as:

// Provided by VK_NV_optical_flow
typedef struct VkOpticalFlowSessionCreateInfoNV {
    VkStructureType                      sType;
    void*                                pNext;
    uint32_t                             width;
    uint32_t                             height;
    VkFormat                             imageFormat;
    VkFormat                             flowVectorFormat;
    VkFormat                             costFormat;
    VkOpticalFlowGridSizeFlagsNV         outputGridSize;
    VkOpticalFlowGridSizeFlagsNV         hintGridSize;
    VkOpticalFlowPerformanceLevelNV      performanceLevel;
    VkOpticalFlowSessionCreateFlagsNV    flags;
} VkOpticalFlowSessionCreateInfoNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`width` is the width in pixels of the input or reference frame to be
bound to this optical flow session.

* 
`height` is the height in pixels of the input or reference frame to
be bound to this optical flow session.

* 
`imageFormat` is the [VkFormat](VkFormat.html) of the input and reference frame
to be bound to this optical flow session.

* 
`flowVectorFormat` is the [VkFormat](VkFormat.html) of the flow vector maps
(output or hint) to be bound to this optical flow session.

* 
`costFormat` is the [VkFormat](VkFormat.html) of the cost maps to be bound to
this optical flow session.

* 
`outputGridSize` is exactly one bit of
[VkOpticalFlowGridSizeFlagsNV](VkOpticalFlowGridSizeFlagsNV.html) specifying the grid size of the
output flow and cost maps to be bound to this optical flow session.
The size of the output flow and cost maps is determined by
`VkOpticalFlowSessionCreateInfoNV`::`width` and
`VkOpticalFlowSessionCreateInfoNV`::`height` divided by
`VkOpticalFlowSessionCreateInfoNV`::`outputGridSize`.

* 
`hintGridSize` is one exactly bit of
[VkOpticalFlowGridSizeFlagsNV](VkOpticalFlowGridSizeFlagsNV.html) specifying the grid size of the hint
flow vector maps to be bound to this optical flow session.
The size of the hint maps is determined by
`VkOpticalFlowSessionCreateInfoNV`::`width` and
`VkOpticalFlowSessionCreateInfoNV`::`height` divided by
`VkOpticalFlowSessionCreateInfoNV`::`hintGridSize`.

* 
`performanceLevel` is the [VkOpticalFlowPerformanceLevelNV](VkOpticalFlowPerformanceLevelNV.html) used
for this optical flow session.

* 
`flags` are the [VkOpticalFlowSessionCreateFlagsNV](VkOpticalFlowSessionCreateFlagsNV.html) used for
this optical flow session.

Valid Usage

* 
[](#VUID-VkOpticalFlowSessionCreateInfoNV-width-07581) VUID-VkOpticalFlowSessionCreateInfoNV-width-07581

`width` **must** be greater than or equal to
`VkPhysicalDeviceOpticalFlowPropertiesNV`::`minWidth` and less
than or equal to
`VkPhysicalDeviceOpticalFlowPropertiesNV`::`maxWidth`

* 
[](#VUID-VkOpticalFlowSessionCreateInfoNV-height-07582) VUID-VkOpticalFlowSessionCreateInfoNV-height-07582

`height` **must** be greater than or equal to
`VkPhysicalDeviceOpticalFlowPropertiesNV`::`minHeight` and less
than or equal to
`VkPhysicalDeviceOpticalFlowPropertiesNV`::`maxHeight`

* 
[](#VUID-VkOpticalFlowSessionCreateInfoNV-imageFormat-07583) VUID-VkOpticalFlowSessionCreateInfoNV-imageFormat-07583

`imageFormat` **must** be one of the formats returned by
[vkGetPhysicalDeviceOpticalFlowImageFormatsNV](vkGetPhysicalDeviceOpticalFlowImageFormatsNV.html) for
[VK_OPTICAL_FLOW_USAGE_INPUT_BIT_NV](VkOpticalFlowUsageFlagBitsNV.html)

* 
[](#VUID-VkOpticalFlowSessionCreateInfoNV-flowVectorFormat-07584) VUID-VkOpticalFlowSessionCreateInfoNV-flowVectorFormat-07584

`flowVectorFormat` **must** be one of the formats returned by
[vkGetPhysicalDeviceOpticalFlowImageFormatsNV](vkGetPhysicalDeviceOpticalFlowImageFormatsNV.html) for
[VK_OPTICAL_FLOW_USAGE_OUTPUT_BIT_NV](VkOpticalFlowUsageFlagBitsNV.html)

* 
[](#VUID-VkOpticalFlowSessionCreateInfoNV-costFormat-07585) VUID-VkOpticalFlowSessionCreateInfoNV-costFormat-07585

`costFormat` **must** be one of the formats returned by
[vkGetPhysicalDeviceOpticalFlowImageFormatsNV](vkGetPhysicalDeviceOpticalFlowImageFormatsNV.html) for
[VK_OPTICAL_FLOW_USAGE_COST_BIT_NV](VkOpticalFlowUsageFlagBitsNV.html) if
[VK_OPTICAL_FLOW_SESSION_CREATE_ENABLE_COST_BIT_NV](VkOpticalFlowSessionCreateFlagBitsNV.html) is set in
`flags`

* 
[](#VUID-VkOpticalFlowSessionCreateInfoNV-outputGridSize-07586) VUID-VkOpticalFlowSessionCreateInfoNV-outputGridSize-07586

`outputGridSize` **must** be exactly one of the bits reported in
`VkPhysicalDeviceOpticalFlowPropertiesNV`::`supportedOutputGridSizes`

* 
[](#VUID-VkOpticalFlowSessionCreateInfoNV-hintGridSize-07587) VUID-VkOpticalFlowSessionCreateInfoNV-hintGridSize-07587

`hintGridSize` **must** be exactly one of the bits reported in
`VkPhysicalDeviceOpticalFlowPropertiesNV`::`supportedHintGridSizes`
if [VK_OPTICAL_FLOW_SESSION_CREATE_ENABLE_HINT_BIT_NV](VkOpticalFlowSessionCreateFlagBitsNV.html) is set in
`flags`

* 
[](#VUID-VkOpticalFlowSessionCreateInfoNV-flags-07588) VUID-VkOpticalFlowSessionCreateInfoNV-flags-07588

[VK_OPTICAL_FLOW_SESSION_CREATE_ENABLE_HINT_BIT_NV](VkOpticalFlowSessionCreateFlagBitsNV.html) **must** not be set
in `flags` if
`VkPhysicalDeviceOpticalFlowPropertiesNV`::`hintSupported` is
[VK_FALSE](VK_FALSE.html)

* 
[](#VUID-VkOpticalFlowSessionCreateInfoNV-flags-07589) VUID-VkOpticalFlowSessionCreateInfoNV-flags-07589

[VK_OPTICAL_FLOW_SESSION_CREATE_ENABLE_COST_BIT_NV](VkOpticalFlowSessionCreateFlagBitsNV.html) **must** not be set
in `flags` if
`VkPhysicalDeviceOpticalFlowPropertiesNV`::`costSupported` is
[VK_FALSE](VK_FALSE.html)

* 
[](#VUID-VkOpticalFlowSessionCreateInfoNV-flags-07590) VUID-VkOpticalFlowSessionCreateInfoNV-flags-07590

[VK_OPTICAL_FLOW_SESSION_CREATE_ENABLE_GLOBAL_FLOW_BIT_NV](VkOpticalFlowSessionCreateFlagBitsNV.html) **must** not
be set in `flags` if
`VkPhysicalDeviceOpticalFlowPropertiesNV`::`globalFlowSupported`
is [VK_FALSE](VK_FALSE.html)

* 
[](#VUID-VkOpticalFlowSessionCreateInfoNV-flags-07591) VUID-VkOpticalFlowSessionCreateInfoNV-flags-07591

[VK_OPTICAL_FLOW_SESSION_CREATE_ALLOW_REGIONS_BIT_NV](VkOpticalFlowSessionCreateFlagBitsNV.html) **must** not be
set in `flags` if
`VkPhysicalDeviceOpticalFlowPropertiesNV`::`maxNumRegionsOfInterest`
is 0

* 
[](#VUID-VkOpticalFlowSessionCreateInfoNV-flags-07592) VUID-VkOpticalFlowSessionCreateInfoNV-flags-07592

[VK_OPTICAL_FLOW_SESSION_CREATE_BOTH_DIRECTIONS_BIT_NV](VkOpticalFlowSessionCreateFlagBitsNV.html) **must** not be
set in `flags` if
`VkPhysicalDeviceOpticalFlowPropertiesNV`::`bidirectionalFlowSupported`
is [VK_FALSE](VK_FALSE.html)

Valid Usage (Implicit)

* 
[](#VUID-VkOpticalFlowSessionCreateInfoNV-sType-sType) VUID-VkOpticalFlowSessionCreateInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_OPTICAL_FLOW_SESSION_CREATE_INFO_NV](VkStructureType.html)

* 
[](#VUID-VkOpticalFlowSessionCreateInfoNV-pNext-pNext) VUID-VkOpticalFlowSessionCreateInfoNV-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkOpticalFlowSessionCreatePrivateDataInfoNV](VkOpticalFlowSessionCreatePrivateDataInfoNV.html)

* 
[](#VUID-VkOpticalFlowSessionCreateInfoNV-sType-unique) VUID-VkOpticalFlowSessionCreateInfoNV-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkOpticalFlowSessionCreateInfoNV-imageFormat-parameter) VUID-VkOpticalFlowSessionCreateInfoNV-imageFormat-parameter

 `imageFormat` **must** be a valid [VkFormat](VkFormat.html) value

* 
[](#VUID-VkOpticalFlowSessionCreateInfoNV-flowVectorFormat-parameter) VUID-VkOpticalFlowSessionCreateInfoNV-flowVectorFormat-parameter

 `flowVectorFormat` **must** be a valid [VkFormat](VkFormat.html) value

* 
[](#VUID-VkOpticalFlowSessionCreateInfoNV-costFormat-parameter) VUID-VkOpticalFlowSessionCreateInfoNV-costFormat-parameter

 If `costFormat` is not `0`, `costFormat` **must** be a valid [VkFormat](VkFormat.html) value

* 
[](#VUID-VkOpticalFlowSessionCreateInfoNV-outputGridSize-parameter) VUID-VkOpticalFlowSessionCreateInfoNV-outputGridSize-parameter

 `outputGridSize` **must** be a valid combination of [VkOpticalFlowGridSizeFlagBitsNV](VkOpticalFlowGridSizeFlagBitsNV.html) values

* 
[](#VUID-VkOpticalFlowSessionCreateInfoNV-outputGridSize-requiredbitmask) VUID-VkOpticalFlowSessionCreateInfoNV-outputGridSize-requiredbitmask

 `outputGridSize` **must** not be `0`

* 
[](#VUID-VkOpticalFlowSessionCreateInfoNV-hintGridSize-parameter) VUID-VkOpticalFlowSessionCreateInfoNV-hintGridSize-parameter

 `hintGridSize` **must** be a valid combination of [VkOpticalFlowGridSizeFlagBitsNV](VkOpticalFlowGridSizeFlagBitsNV.html) values

* 
[](#VUID-VkOpticalFlowSessionCreateInfoNV-performanceLevel-parameter) VUID-VkOpticalFlowSessionCreateInfoNV-performanceLevel-parameter

 If `performanceLevel` is not `0`, `performanceLevel` **must** be a valid [VkOpticalFlowPerformanceLevelNV](VkOpticalFlowPerformanceLevelNV.html) value

* 
[](#VUID-VkOpticalFlowSessionCreateInfoNV-flags-parameter) VUID-VkOpticalFlowSessionCreateInfoNV-flags-parameter

 `flags` **must** be a valid combination of [VkOpticalFlowSessionCreateFlagBitsNV](VkOpticalFlowSessionCreateFlagBitsNV.html) values

[VK_NV_optical_flow](VK_NV_optical_flow.html), [VkFormat](VkFormat.html), [VkOpticalFlowGridSizeFlagsNV](VkOpticalFlowGridSizeFlagsNV.html), [VkOpticalFlowPerformanceLevelNV](VkOpticalFlowPerformanceLevelNV.html), [VkOpticalFlowSessionCreateFlagsNV](VkOpticalFlowSessionCreateFlagsNV.html), [VkStructureType](VkStructureType.html), [vkCreateOpticalFlowSessionNV](vkCreateOpticalFlowSessionNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_NV_optical_flow/optical_flow.html#VkOpticalFlowSessionCreateInfoNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
