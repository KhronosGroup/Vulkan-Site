# VkLatencyMarkerNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkLatencyMarkerNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkLatencyMarkerNV - Structure used to mark different points in latency

The [VkLatencyMarkerNV](#) enum is defined as:

// Provided by VK_NV_low_latency2
typedef enum VkLatencyMarkerNV {
    VK_LATENCY_MARKER_SIMULATION_START_NV = 0,
    VK_LATENCY_MARKER_SIMULATION_END_NV = 1,
    VK_LATENCY_MARKER_RENDERSUBMIT_START_NV = 2,
    VK_LATENCY_MARKER_RENDERSUBMIT_END_NV = 3,
    VK_LATENCY_MARKER_PRESENT_START_NV = 4,
    VK_LATENCY_MARKER_PRESENT_END_NV = 5,
    VK_LATENCY_MARKER_INPUT_SAMPLE_NV = 6,
    VK_LATENCY_MARKER_TRIGGER_FLASH_NV = 7,
    VK_LATENCY_MARKER_OUT_OF_BAND_RENDERSUBMIT_START_NV = 8,
    VK_LATENCY_MARKER_OUT_OF_BAND_RENDERSUBMIT_END_NV = 9,
    VK_LATENCY_MARKER_OUT_OF_BAND_PRESENT_START_NV = 10,
    VK_LATENCY_MARKER_OUT_OF_BAND_PRESENT_END_NV = 11,
} VkLatencyMarkerNV;

The members of the [VkLatencyMarkerNV](#) are used as arguments for
[vkSetLatencyMarkerNV](vkSetLatencyMarkerNV.html) in the use cases described below:

* 
[VK_LATENCY_MARKER_SIMULATION_START_NV](#) **should** be called at the
start of the simulation execution each frame, but after the call to
`vkLatencySleepNV`.

* 
[VK_LATENCY_MARKER_SIMULATION_END_NV](#) **should** be called at the end
of the simulation execution each frame.

* 
[VK_LATENCY_MARKER_RENDERSUBMIT_START_NV](#) **should** be called at the
beginning of the render submission execution each frame.
This **should** be wherever Vulkan API calls are made and **must** not span
into asynchronous rendering.

* 
[VK_LATENCY_MARKER_RENDERSUBMIT_END_NV](#) **should** be called at the end
of the render submission execution each frame.

* 
[VK_LATENCY_MARKER_PRESENT_START_NV](#) **should** be called just before
the `vkQueuePresentKHR` call requesting presentation of an
application-rendered frame.

* 
[VK_LATENCY_MARKER_PRESENT_END_NV](#) **should** be called when that
`vkQueuePresentKHR` call returns.
This may be used to delimit workload submissions between
application-rendered frames according to the rules defined in
[Frame Attribution](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#low-latency2-frame-attribution).

* 
[VK_LATENCY_MARKER_INPUT_SAMPLE_NV](#) **should** be called just before
the application gathers input data.

* 
[VK_LATENCY_MARKER_TRIGGER_FLASH_NV](#) **should** be called anywhere
between [VK_LATENCY_MARKER_SIMULATION_START_NV](#) and
[VK_LATENCY_MARKER_SIMULATION_END_NV](#) whenever a left mouse click
occurs.

|  | The [VK_LATENCY_MARKER_OUT_OF_BAND_RENDERSUBMIT_START_NV](#),
| --- | --- |
[VK_LATENCY_MARKER_OUT_OF_BAND_RENDERSUBMIT_END_NV](#),
[VK_LATENCY_MARKER_OUT_OF_BAND_PRESENT_START_NV](#), and
[VK_LATENCY_MARKER_OUT_OF_BAND_PRESENT_END_NV](#) markers are not intended
for use by typical applications.
See [Frame Attribution](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#low-latency2-frame-attribution) for information on how the
implementation interprets these markers. |

|  | Intermediate layers, such as frame-generation implementations, **may** defer or
| --- | --- |
replace `vkQueuePresentKHR` calls.
Such layers **should** leave the original
[VK_LATENCY_MARKER_PRESENT_START_NV](#) and
[VK_LATENCY_MARKER_PRESENT_END_NV](#) markers in place and emit
[VK_LATENCY_MARKER_OUT_OF_BAND_PRESENT_START_NV](#) and
[VK_LATENCY_MARKER_OUT_OF_BAND_PRESENT_END_NV](#) markers surrounding each
of their `vkQueuePresentKHR` calls. |

[VK_NV_low_latency2](VK_NV_low_latency2.html), [VkSetLatencyMarkerInfoNV](VkSetLatencyMarkerInfoNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkLatencyMarkerNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
