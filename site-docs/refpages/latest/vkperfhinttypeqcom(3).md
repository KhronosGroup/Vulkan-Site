# VkPerfHintTypeQCOM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPerfHintTypeQCOM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPerfHintTypeQCOM - Specifies the performance hint type

Possible values of [VkPerfHintInfoQCOM](VkPerfHintInfoQCOM.html)::`type`, specifying the type
of performance hint to apply, are:

// Provided by VK_QCOM_queue_perf_hint
typedef enum VkPerfHintTypeQCOM {
    VK_PERF_HINT_TYPE_DEFAULT_QCOM = 0,
    VK_PERF_HINT_TYPE_FREQUENCY_MIN_QCOM = 1,
    VK_PERF_HINT_TYPE_FREQUENCY_MAX_QCOM = 2,
    VK_PERF_HINT_TYPE_FREQUENCY_SCALED_QCOM = 3,
} VkPerfHintTypeQCOM;

* 
[VK_PERF_HINT_TYPE_DEFAULT_QCOM](#) resets the performance hint state
back to default for the queue.

* 
[VK_PERF_HINT_TYPE_FREQUENCY_MIN_QCOM](#) specifies the queue **should**
prioritize power and sets the frequency constraints `fmin` and
`fmax` to `Fmin`.

* 
[VK_PERF_HINT_TYPE_FREQUENCY_MAX_QCOM](#) specifies the queue **should**
prioritize performance and sets the frequency constraints `fmin` and
`fmax` to `Fmax`.

* 
[VK_PERF_HINT_TYPE_FREQUENCY_SCALED_QCOM](#) specifies the queue
**should** be balanced between performance and power and sets the frequency
constraint `fmin` by applying a scale factor to `Fmax`.
No constraint is applied to `fmax`.

[VK_QCOM_queue_perf_hint](VK_QCOM_queue_perf_hint.html), [VkPerfHintInfoQCOM](VkPerfHintInfoQCOM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/devsandqueues.html#VkPerfHintTypeQCOM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
