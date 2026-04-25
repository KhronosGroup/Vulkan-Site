# VkPresentStageTimeEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPresentStageTimeEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPresentStageTimeEXT - Associate a present stage with a timestamp

The `VkPresentStageTimeEXT` structure is defined as:

// Provided by VK_EXT_present_timing
typedef struct VkPresentStageTimeEXT {
    VkPresentStageFlagsEXT    stage;
    uint64_t                  time;
} VkPresentStageTimeEXT;

* 
`stage` is a [VkPresentStageFlagsEXT](VkPresentStageFlagsEXT.html) value specifying a present
stage.

* 
`time` is a time in nanoseconds associated with the `stage`.

[VK_EXT_present_timing](VK_EXT_present_timing.html), [VkPastPresentationTimingEXT](VkPastPresentationTimingEXT.html), [VkPresentStageFlagsEXT](VkPresentStageFlagsEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkPresentStageTimeEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
