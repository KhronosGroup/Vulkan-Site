# VkThrottleHintSubmitInfoSEC(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkThrottleHintSubmitInfoSEC.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkThrottleHintSubmitInfoSEC - Stub description of VkThrottleHintSubmitInfoSEC

There is currently no specification language written for this type.
This section acts only as placeholder and to avoid dead links in the
specification and reference pages.

// Provided by VK_SEC_throttle_hint
typedef struct VkThrottleHintSubmitInfoSEC {
    VkStructureType          sType;
    const void*              pNext;
    VkThrottleHintTypeSEC    throttleHint;
} VkThrottleHintSubmitInfoSEC;

Valid Usage (Implicit)

* 
[](#VUID-VkThrottleHintSubmitInfoSEC-sType-sType) VUID-VkThrottleHintSubmitInfoSEC-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_THROTTLE_HINT_SUBMIT_INFO_SEC](VkStructureType.html)

* 
[](#VUID-VkThrottleHintSubmitInfoSEC-throttleHint-parameter) VUID-VkThrottleHintSubmitInfoSEC-throttleHint-parameter

 `throttleHint` **must** be a valid [VkThrottleHintTypeSEC](VkThrottleHintTypeSEC.html) value

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSubmitInfo](VkSubmitInfo.html)

[VK_SEC_throttle_hint](VK_SEC_throttle_hint.html), [VkStructureType](VkStructureType.html), [VkThrottleHintTypeSEC](VkThrottleHintTypeSEC.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VkThrottleHintSubmitInfoSEC).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
