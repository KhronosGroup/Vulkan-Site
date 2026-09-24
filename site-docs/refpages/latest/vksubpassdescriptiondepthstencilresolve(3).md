# VkSubpassDescriptionDepthStencilResolve(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSubpassDescriptionDepthStencilResolve.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSubpassDescriptionDepthStencilResolve - Structure specifying depth/stencil resolve operations for a subpass

The `VkSubpassDescriptionDepthStencilResolve` structure is defined as:

|  | This functionality is superseded by [Vulkan Version 1.4](../../../../spec/latest/appendices/versions.html#versions-1.4). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-dynamicrendering) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_2
typedef struct VkSubpassDescriptionDepthStencilResolve {
    VkStructureType                  sType;
    const void*                      pNext;
    VkResolveModeFlagBits            depthResolveMode;
    VkResolveModeFlagBits            stencilResolveMode;
    const VkAttachmentReference2*    pDepthStencilResolveAttachment;
} VkSubpassDescriptionDepthStencilResolve;

// Provided by VK_KHR_depth_stencil_resolve
// Equivalent to VkSubpassDescriptionDepthStencilResolve
typedef VkSubpassDescriptionDepthStencilResolve VkSubpassDescriptionDepthStencilResolveKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`depthResolveMode` is a [VkResolveModeFlagBits](VkResolveModeFlagBits.html) value describing
the depth resolve mode.

* 
`stencilResolveMode` is a [VkResolveModeFlagBits](VkResolveModeFlagBits.html) value
describing the stencil resolve mode.

* 
`pDepthStencilResolveAttachment` is `NULL` or a pointer to a
[VkAttachmentReference2](VkAttachmentReference2.html) structure defining the depth/stencil
resolve attachment for this subpass and its layout.

If the `pNext` chain of [VkSubpassDescription2](VkSubpassDescription2.html) includes a
`VkSubpassDescriptionDepthStencilResolve` structure, then that structure
describes [multisample resolve operations](../../../../spec/latest/chapters/renderpass.html#renderpass-resolve-operations)
for the depth/stencil attachment in a subpass.
If this structure is not included in the `pNext` chain of
[VkSubpassDescription2](VkSubpassDescription2.html), or if it is and either
`pDepthStencilResolveAttachment` is `NULL` or its attachment index is
[VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html), it indicates that no depth/stencil resolve
attachment will be used in the subpass.

Valid Usage

* 
[](#VUID-VkSubpassDescriptionDepthStencilResolve-pDepthStencilResolveAttachment-03177) VUID-VkSubpassDescriptionDepthStencilResolve-pDepthStencilResolveAttachment-03177

If `pDepthStencilResolveAttachment` is not `NULL` and does not have
the value [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html), `pDepthStencilAttachment`
**must** not be `NULL` or have the value [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html)

* 
[](#VUID-VkSubpassDescriptionDepthStencilResolve-pDepthStencilResolveAttachment-03179) VUID-VkSubpassDescriptionDepthStencilResolve-pDepthStencilResolveAttachment-03179

If `pDepthStencilResolveAttachment` is not `NULL` and does not have
the value [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html), `pDepthStencilAttachment`
**must** not have a sample count of [VK_SAMPLE_COUNT_1_BIT](VkSampleCountFlagBits.html)

* 
[](#VUID-VkSubpassDescriptionDepthStencilResolve-pDepthStencilResolveAttachment-03180) VUID-VkSubpassDescriptionDepthStencilResolve-pDepthStencilResolveAttachment-03180

If `pDepthStencilResolveAttachment` is not `NULL` and does not have
the value [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html),
`pDepthStencilResolveAttachment` **must** have a sample count of
[VK_SAMPLE_COUNT_1_BIT](VkSampleCountFlagBits.html)

* 
[](#VUID-VkSubpassDescriptionDepthStencilResolve-pDepthStencilResolveAttachment-02651) VUID-VkSubpassDescriptionDepthStencilResolve-pDepthStencilResolveAttachment-02651

If `pDepthStencilResolveAttachment` is not `NULL` and does not have
the value [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html) then it **must** have an image format
whose [potential format features](../../../../spec/latest/chapters/formats.html#potential-format-features) contain
[VK_FORMAT_FEATURE_DEPTH_STENCIL_ATTACHMENT_BIT](VkFormatFeatureFlagBits.html)

* 
[](#VUID-VkSubpassDescriptionDepthStencilResolve-pDepthStencilResolveAttachment-03181) VUID-VkSubpassDescriptionDepthStencilResolve-pDepthStencilResolveAttachment-03181

If `pDepthStencilResolveAttachment` is not `NULL` and does not have
the value [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html) and [VkFormat](VkFormat.html) of
`pDepthStencilResolveAttachment` has a depth component, then the
[VkFormat](VkFormat.html) of `pDepthStencilAttachment` **must** have a depth
component with the same number of bits and [    numeric format](../../../../spec/latest/chapters/formats.html#formats-numericformat)

* 
[](#VUID-VkSubpassDescriptionDepthStencilResolve-pDepthStencilResolveAttachment-03182) VUID-VkSubpassDescriptionDepthStencilResolve-pDepthStencilResolveAttachment-03182

If `pDepthStencilResolveAttachment` is not `NULL` and does not have
the value [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html), and [VkFormat](VkFormat.html) of
`pDepthStencilResolveAttachment` has a stencil component, then the
[VkFormat](VkFormat.html) of `pDepthStencilAttachment` **must** have a stencil
component with the same number of bits and [    numeric format](../../../../spec/latest/chapters/formats.html#formats-numericformat)

* 
[](#VUID-VkSubpassDescriptionDepthStencilResolve-pDepthStencilResolveAttachment-03178) VUID-VkSubpassDescriptionDepthStencilResolve-pDepthStencilResolveAttachment-03178

If `pDepthStencilResolveAttachment` is not `NULL` and does not have
the value [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html), `depthResolveMode` and
`stencilResolveMode` **must** not both be [VK_RESOLVE_MODE_NONE](VkResolveModeFlagBits.html)

* 
[](#VUID-VkSubpassDescriptionDepthStencilResolve-depthResolveMode-03183) VUID-VkSubpassDescriptionDepthStencilResolve-depthResolveMode-03183

If `pDepthStencilResolveAttachment` is not `NULL` and does not have
the value [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html) and the [VkFormat](VkFormat.html) of
`pDepthStencilResolveAttachment` has a depth component, then the
value of `depthResolveMode` **must** be one of the bits set in
[VkPhysicalDeviceDepthStencilResolveProperties](VkPhysicalDeviceDepthStencilResolveProperties.html)::`supportedDepthResolveModes`
or [VK_RESOLVE_MODE_NONE](VkResolveModeFlagBits.html)

* 
[](#VUID-VkSubpassDescriptionDepthStencilResolve-stencilResolveMode-03184) VUID-VkSubpassDescriptionDepthStencilResolve-stencilResolveMode-03184

If `pDepthStencilResolveAttachment` is not `NULL` and does not have
the value [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html) and the [VkFormat](VkFormat.html) of
`pDepthStencilResolveAttachment` has a stencil component, then the
value of `stencilResolveMode` **must** be one of the bits set in
[VkPhysicalDeviceDepthStencilResolveProperties](VkPhysicalDeviceDepthStencilResolveProperties.html)::`supportedStencilResolveModes`
or [VK_RESOLVE_MODE_NONE](VkResolveModeFlagBits.html)

* 
[](#VUID-VkSubpassDescriptionDepthStencilResolve-pDepthStencilResolveAttachment-03185) VUID-VkSubpassDescriptionDepthStencilResolve-pDepthStencilResolveAttachment-03185

If `pDepthStencilResolveAttachment` is not `NULL` and does not have
the value [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html), the [VkFormat](VkFormat.html) of
`pDepthStencilResolveAttachment` has both depth and stencil
components,
[VkPhysicalDeviceDepthStencilResolveProperties](VkPhysicalDeviceDepthStencilResolveProperties.html)::`independentResolve`
is [VK_FALSE](VK_FALSE.html), and
[VkPhysicalDeviceDepthStencilResolveProperties](VkPhysicalDeviceDepthStencilResolveProperties.html)::`independentResolveNone`
is [VK_FALSE](VK_FALSE.html), then the values of `depthResolveMode` and
`stencilResolveMode` **must** be identical

* 
[](#VUID-VkSubpassDescriptionDepthStencilResolve-pDepthStencilResolveAttachment-03186) VUID-VkSubpassDescriptionDepthStencilResolve-pDepthStencilResolveAttachment-03186

If `pDepthStencilResolveAttachment` is not `NULL` and does not have
the value [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html), the [VkFormat](VkFormat.html) of
`pDepthStencilResolveAttachment` has both depth and stencil
components,
[VkPhysicalDeviceDepthStencilResolveProperties](VkPhysicalDeviceDepthStencilResolveProperties.html)::`independentResolve`
is [VK_FALSE](VK_FALSE.html) and
[VkPhysicalDeviceDepthStencilResolveProperties](VkPhysicalDeviceDepthStencilResolveProperties.html)::`independentResolveNone`
is [VK_TRUE](VK_TRUE.html), then the values of `depthResolveMode` and
`stencilResolveMode` **must** be identical or one of them **must** be
[VK_RESOLVE_MODE_NONE](VkResolveModeFlagBits.html)

* 
[](#VUID-VkSubpassDescriptionDepthStencilResolve-pNext-06873) VUID-VkSubpassDescriptionDepthStencilResolve-pNext-06873

If the `pNext` chain of [VkSubpassDescription2](VkSubpassDescription2.html) includes a
`VkMultisampledRenderToSingleSampledInfoEXT` structure, the
`multisampledRenderToSingleSampledEnable` field is [VK_TRUE](VK_TRUE.html),
and `pDepthStencilAttachment` is not `NULL` and does not have the
value [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html), `depthResolveMode` and
`stencilResolveMode` **must** not both be [VK_RESOLVE_MODE_NONE](VkResolveModeFlagBits.html)

* 
[](#VUID-VkSubpassDescriptionDepthStencilResolve-pNext-06874) VUID-VkSubpassDescriptionDepthStencilResolve-pNext-06874

If the `pNext` chain of [VkSubpassDescription2](VkSubpassDescription2.html) includes a
`VkMultisampledRenderToSingleSampledInfoEXT` structure whose
`multisampledRenderToSingleSampledEnable` field is [VK_TRUE](VK_TRUE.html),
and `pDepthStencilAttachment` is not `NULL`, does not have the value
[VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html), and has a [VkFormat](VkFormat.html) that has a depth
component, then the value of `depthResolveMode` **must** be one of the
bits set in
[VkPhysicalDeviceDepthStencilResolveProperties](VkPhysicalDeviceDepthStencilResolveProperties.html)::`supportedDepthResolveModes`
or [VK_RESOLVE_MODE_NONE](VkResolveModeFlagBits.html)

* 
[](#VUID-VkSubpassDescriptionDepthStencilResolve-pNext-06875) VUID-VkSubpassDescriptionDepthStencilResolve-pNext-06875

If the `pNext` chain of [VkSubpassDescription2](VkSubpassDescription2.html) includes a
`VkMultisampledRenderToSingleSampledInfoEXT` structure whose
`multisampledRenderToSingleSampledEnable` field is [VK_TRUE](VK_TRUE.html),
and `pDepthStencilAttachment` is not `NULL`, does not have the value
[VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html), and has a [VkFormat](VkFormat.html) with a stencil
component, then the value of `stencilResolveMode` **must** be one of
the bits set in
[VkPhysicalDeviceDepthStencilResolveProperties](VkPhysicalDeviceDepthStencilResolveProperties.html)::`supportedStencilResolveModes`
or [VK_RESOLVE_MODE_NONE](VkResolveModeFlagBits.html)

* 
[](#VUID-VkSubpassDescriptionDepthStencilResolve-pNext-06876) VUID-VkSubpassDescriptionDepthStencilResolve-pNext-06876

If the `pNext` chain of [VkSubpassDescription2](VkSubpassDescription2.html) includes a
`VkMultisampledRenderToSingleSampledInfoEXT` structure whose
`multisampledRenderToSingleSampledEnable` field is [VK_TRUE](VK_TRUE.html),
`pDepthStencilAttachment` is not `NULL`, does not have the value
[VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html), and has a [VkFormat](VkFormat.html) with both depth and
stencil components, and both
[VkPhysicalDeviceDepthStencilResolveProperties](VkPhysicalDeviceDepthStencilResolveProperties.html)::`independentResolve`
and
[VkPhysicalDeviceDepthStencilResolveProperties](VkPhysicalDeviceDepthStencilResolveProperties.html)::`independentResolveNone`
are [VK_FALSE](VK_FALSE.html), then the values of `depthResolveMode` and
`stencilResolveMode` **must** be identical

* 
[](#VUID-VkSubpassDescriptionDepthStencilResolve-pNext-06877) VUID-VkSubpassDescriptionDepthStencilResolve-pNext-06877

If the `pNext` chain of [VkSubpassDescription2](VkSubpassDescription2.html) includes a
`VkMultisampledRenderToSingleSampledInfoEXT` structure whose
`multisampledRenderToSingleSampledEnable` field is [VK_TRUE](VK_TRUE.html),
`pDepthStencilAttachment` is not `NULL`, does not have the value
[VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html), and has a [VkFormat](VkFormat.html) with both depth and
stencil components,
[VkPhysicalDeviceDepthStencilResolveProperties](VkPhysicalDeviceDepthStencilResolveProperties.html)::`independentResolve`
is [VK_FALSE](VK_FALSE.html), and
[VkPhysicalDeviceDepthStencilResolveProperties](VkPhysicalDeviceDepthStencilResolveProperties.html)::`independentResolveNone`
is [VK_TRUE](VK_TRUE.html), then the values of `depthResolveMode` and
`stencilResolveMode` **must** be identical or one of them **must** be
[VK_RESOLVE_MODE_NONE](VkResolveModeFlagBits.html)

Valid Usage (Implicit)

* 
[](#VUID-VkSubpassDescriptionDepthStencilResolve-sType-sType) VUID-VkSubpassDescriptionDepthStencilResolve-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SUBPASS_DESCRIPTION_DEPTH_STENCIL_RESOLVE](VkStructureType.html)

* 
[](#VUID-VkSubpassDescriptionDepthStencilResolve-pDepthStencilResolveAttachment-parameter) VUID-VkSubpassDescriptionDepthStencilResolve-pDepthStencilResolveAttachment-parameter

 If `pDepthStencilResolveAttachment` is not `NULL`, `pDepthStencilResolveAttachment` **must** be a valid pointer to a valid [VkAttachmentReference2](VkAttachmentReference2.html) structure

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSubpassDescription2](VkSubpassDescription2.html)

[VK_KHR_depth_stencil_resolve](VK_KHR_depth_stencil_resolve.html), [VK_VERSION_1_2](VK_VERSION_1_2.html), [VkAttachmentReference2](VkAttachmentReference2.html), [VkResolveModeFlagBits](VkResolveModeFlagBits.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#VkSubpassDescriptionDepthStencilResolve).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
