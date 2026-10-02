# VK_QCOM_render_pass_shader_resolve(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_QCOM_render_pass_shader_resolve.html

## Table of Contents

- [Name](#_name)
- [VK_QCOM_render_pass_shader_resolve](#VK_QCOM_render_pass_shader_resolve)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_QCOM_render_pass_shader_resolve - device extension

**Name String**

`VK_QCOM_render_pass_shader_resolve`

**Extension Type**

Device extension

**Registered Extension Number**

172

**Revision**

4

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

None

**Deprecation State**

* 
*Promoted* to
[VK_EXT_custom_resolve](VK_EXT_custom_resolve.html)
extension

**Contact**

* 
Matthew Netsch [mnetsch](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_QCOM_render_pass_shader_resolve] @mnetsch%0A*Here describe the issue or question you have about the VK_QCOM_render_pass_shader_resolve extension*)

**Last Modified Date**

2019-11-07

**IP Status**

No known IP claims.

**Interactions and External Dependencies**

None.

**Contributors**

* 
Srihari Babu Alla, Qualcomm

* 
Bill Licea-Kane, Qualcomm

* 
Jeff Leger, Qualcomm

This extension allows a shader resolve to replace fixed-function resolve.

Fixed-function resolve is limited in function to simple filters of
multisample buffers to a single sample buffer.

Fixed-function resolve is more performance efficient and/or power efficient
than shader resolve for such simple filters.

Shader resolve allows a shader writer to create complex, non-linear
filtering of a multisample buffer in the last subpass of a subpass
dependency chain.

This extension also provides a bit which **can** be used to enlarge a sample
region dependency to a fragment region dependency, so that a
framebuffer-region dependency **can** replace a framebuffer-global dependency
in some cases.

* 
`VK_QCOM_RENDER_PASS_SHADER_RESOLVE_EXTENSION_NAME`

* 
`VK_QCOM_RENDER_PASS_SHADER_RESOLVE_SPEC_VERSION`

* 
Extending [VkSubpassDescriptionFlagBits](VkSubpassDescriptionFlagBits.html):

[VK_SUBPASS_DESCRIPTION_FRAGMENT_REGION_BIT_QCOM](VkSubpassDescriptionFlagBits.html)

* 
[VK_SUBPASS_DESCRIPTION_SHADER_RESOLVE_BIT_QCOM](VkSubpassDescriptionFlagBits.html)

1) Should this extension be named render_pass_shader_resolve?

**RESOLVED** Yes.

This is part of suite of small extensions to render pass.

Following the style guide, instead of following VK_KHR_create_renderpass2.

2) Should the VK_SAMPLE_COUNT_1_BIT be required for each pColorAttachment
and the DepthStencilAttachment?

**RESOLVED** No.

While this may not be a common use case, and while most fixed-function
resolve hardware has this limitation, there is little reason to require a
shader resolve to resolve to a single sample buffer.

3) Should a shader resolve subpass be the last subpass in a render pass?

**RESOLVED** Yes.

To be more specific, it should be the last subpass in a subpass dependency
chain.

4) Do we need the [VK_SUBPASS_DESCRIPTION_FRAGMENT_REGION_BIT_QCOM](VkSubpassDescriptionFlagBits.html) bit?

**RESOLVED** Yes.

This applies when an input attachment’s sample count is equal to
`rasterizationSamples`.
Further, if `sampleShading` is enabled (explicitly or implicitly) then
`minSampleShading` **must** equal 0.0.

However, this bit may be set on any subpass, it is not restricted to a
shader resolve subpass.

* 
Revision 1, 2019-06-28 (wwlk)

Initial draft

Revision 2, 2019-11-06 (wwlk)

* 
General clean-up/spec updates

* 
Added issues

Revision 3, 2019-11-07 (wwlk)

* 
Typos

* 
Additional issues

* 
Clarified that a shader resolve subpass is the last subpass in a
subpass dependency chain

Revision 4, 2020-01-06 (wwlk)

* 
Change resolution of Issue 1 (*render_pass*, not *renderpass*)

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_QCOM_render_pass_shader_resolve).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
