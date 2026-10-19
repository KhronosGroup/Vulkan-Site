# VkPerfHintInfoQCOM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPerfHintInfoQCOM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPerfHintInfoQCOM - Structure specifying the parameters used for setting a performance hint on a queue

The `VkPerfHintInfoQCOM` structure is defined as:

// Provided by VK_QCOM_queue_perf_hint
typedef struct VkPerfHintInfoQCOM {
    VkStructureType       sType;
    void*                 pNext;
    VkPerfHintTypeQCOM    type;
    uint32_t              scale;
} VkPerfHintInfoQCOM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`type` is a [VkPerfHintTypeQCOM](VkPerfHintTypeQCOM.html) value indicating the type of
performance hint to apply.

* 
`scale` is a normalized fixed-point scale factor.

The device has two global frequency constraints, `fmin` and `fmax`, that
can be influenced by the [VK_PERF_HINT_TYPE_FREQUENCY_MIN_QCOM](VkPerfHintTypeQCOM.html),
[VK_PERF_HINT_TYPE_FREQUENCY_MAX_QCOM](VkPerfHintTypeQCOM.html), and
[VK_PERF_HINT_TYPE_FREQUENCY_SCALED_QCOM](VkPerfHintTypeQCOM.html) performance hints.
These constraints determine the range of clock frequencies that the platform
performance algorithms **may** select from.
If no constraints are set, `fmin` and `fmax` are set to the minimum and
maximum frequencies the device can support, `Fmin` and `Fmax`
respectively.

The `fmin` constraint applied by
[VK_PERF_HINT_TYPE_FREQUENCY_SCALED_QCOM](VkPerfHintTypeQCOM.html) is calculated with the
following:

\(f_{min} = \lfloor\frac{scale}{100} \times
F_{max}\rfloor\)

The implementation rounds `fmin` down to the next available lower
frequency the device supports, clamped to `Fmin`.

The global frequency constraints are determined by combining the performance
hints from all of the device’s active queues of all processes on the host.
Performance hints that influence device frequency are ranked, where a higher
ranked hint supersedes all lower ranked hints.
These are listed in order of highest rank to lowest:

* 
[VK_PERF_HINT_TYPE_FREQUENCY_MAX_QCOM](VkPerfHintTypeQCOM.html)

* 
[VK_PERF_HINT_TYPE_FREQUENCY_SCALED_QCOM](VkPerfHintTypeQCOM.html) and `scale` equal to
`100`

* 
[VK_PERF_HINT_TYPE_FREQUENCY_SCALED_QCOM](VkPerfHintTypeQCOM.html) and `scale` equal to
`99`

* 
[VK_PERF_HINT_TYPE_FREQUENCY_SCALED_QCOM](VkPerfHintTypeQCOM.html) and `scale` equal to
`98`

* 
…​

* 
[VK_PERF_HINT_TYPE_FREQUENCY_SCALED_QCOM](VkPerfHintTypeQCOM.html) and `scale` equal to
`0`

* 
[VK_PERF_HINT_TYPE_DEFAULT_QCOM](VkPerfHintTypeQCOM.html)

* 
[VK_PERF_HINT_TYPE_FREQUENCY_MIN_QCOM](VkPerfHintTypeQCOM.html)

|  | This means that [VK_PERF_HINT_TYPE_FREQUENCY_MIN_QCOM](VkPerfHintTypeQCOM.html) only takes effect
| --- | --- |
if all of the device’s other active queues running on the host also have the
[VK_PERF_HINT_TYPE_FREQUENCY_MIN_QCOM](VkPerfHintTypeQCOM.html) hint applied.

If any queue is active that never had a performance hint applied and
therefore is in the [VK_PERF_HINT_TYPE_DEFAULT_QCOM](VkPerfHintTypeQCOM.html) state, it will
supersede in setting the constraints over
[VK_PERF_HINT_TYPE_FREQUENCY_MIN_QCOM](VkPerfHintTypeQCOM.html).
This is necessary to avoid negatively impacting performance for normal
queues while a low power queue is active. |

Valid Usage

* 
[](#VUID-VkPerfHintInfoQCOM-type-12389) VUID-VkPerfHintInfoQCOM-type-12389

If `type` is not [VK_PERF_HINT_TYPE_FREQUENCY_SCALED_QCOM](VkPerfHintTypeQCOM.html),
`scale` **must** equal `0`

* 
[](#VUID-VkPerfHintInfoQCOM-scale-12390) VUID-VkPerfHintInfoQCOM-scale-12390

`scale` **must** be less than or equal to `100`

Valid Usage (Implicit)

* 
[](#VUID-VkPerfHintInfoQCOM-sType-sType) VUID-VkPerfHintInfoQCOM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PERF_HINT_INFO_QCOM](VkStructureType.html)

* 
[](#VUID-VkPerfHintInfoQCOM-pNext-pNext) VUID-VkPerfHintInfoQCOM-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkPerfHintInfoQCOM-type-parameter) VUID-VkPerfHintInfoQCOM-type-parameter

 `type` **must** be a valid [VkPerfHintTypeQCOM](VkPerfHintTypeQCOM.html) value

[VK_QCOM_queue_perf_hint](VK_QCOM_queue_perf_hint.html), [VkPerfHintTypeQCOM](VkPerfHintTypeQCOM.html), [VkStructureType](VkStructureType.html), [vkQueueSetPerfHintQCOM](vkQueueSetPerfHintQCOM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/devsandqueues.html#VkPerfHintInfoQCOM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
