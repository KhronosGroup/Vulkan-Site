# Proposal Template

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/template.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Solution Space](#_solution_space)
- [2._Solution_Space](#_solution_space)
- [3. Proposal](#_proposal)
- [4. Examples](#_examples)
- [5. Issues](#_issues)
- [5.1. How Are Issues Written?](#_how_are_issues_written)
- [5.1._How_Are_Issues_Written?](#_how_are_issues_written)
- [6. Validation and Tools](#_validation_and_tools)
- [6._Validation_and_Tools](#_validation_and_tools)
- [7. Further Functionality](#_further_functionality)
- [7._Further_Functionality](#_further_functionality)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Solution Space](#_solution_space)
[3. Proposal](#_proposal)
[4. Examples](#_examples)
[5. Issues](#_issues)

[5.1. How Are Issues Written?](#_how_are_issues_written)

[6. Validation and Tools](#_validation_and_tools)
[7. Further Functionality](#_further_functionality)

|  | How to Use This Document
| --- | --- |

This document outlines the expected flow of a proposal - text in the following sections is there as guidance for how to fill out each section.
When creating a new proposal, text inside these sections (including this note!) should be removed and replaced with actual proposal text.

Proposal documents are standalone and do not use the attributes, extensions,
and custom macros available to specification markup.
They should only use pure Asciidoctor markup, so they can be viewed in the
GitHub and GitLab asciidoctor renderers.

When calling out existing API constructs or extensions, the `docs` attribute should be used to link to the relevant part of the Vulkan specification.
For example - "…​used to extend [VkGraphicsPipelineCreateInfo](https://docs.vulkan.org/spec/latest/chapters/pipelines.html#VkGraphicsPipelineCreateInfo)…​"

If adding an image to a proposal document, it must be located in
`../images/proposals/`, and referred to as

image::{images}/proposals/filename.svg[image options] |

A short summary of this proposal should be written here.

This section should detail the problem that is being addressed as succinctly as possible.
Usually this comes in three parts:

Setting the scene

Bulleted list of problems

(Optional) Describe peripheral issues

I.e. things this may enable solutions for, but does not directly address.

Writing this section is a good opportunity to make sure you are not overreaching by trying to address too many problems at once.

This section should briefly describe the options that have been considered (this is a good time to reconsider those options too!).

Start with a bulleted list of the options, usually no more than a paragraph on each option and what the pros/cons of each are, then some sort of brief reason for picking the proposal you are about to make in section 3.

This section should be the most detailed – it should go into enough detail on specific points of the proposal that readers can understand it, but without being overly verbose.
Typically, this section will be split into subsections describing different areas of the proposal.

This should only describe the minimum viable proposal; all those extra things that you could put on top that do not necessarily fix the initial problem should move to section 5 (further functionality).
They may make it into the final proposal, but it is important to give others the opportunity to evaluate these independently.

Where relevant, add one or more examples of how this proposal will be used in practice.
Some proposals that have limited external surface area (e.g. add a flag in a function call) may not require this but try to write motivating examples down where possible.
This section is relatively freeform but should remain concise and to the point.
Extraneous details in examples should be omitted (e.g. code examples do not need to compile).

This section describes issues with the existing proposal – including both open issues that you have not addressed, and closed issues that are not self-evident from the proposal description.

Each issue should be a separate subsection starting with a question, discussion expanding on the question, and a proposal for resolving it if there is one.

While in development, a tag indicating the status (**UNRESOLVED** or
**PROPOSED**) of the issue can be used in the answer text.

Issues which are resolved do not have tags.

All issues must be resolved and any status tags removed before publication.

This section is designed to make sure the extension will not create abnormal challenges for tools. Things to consider:

Is there Validation that will require the GPU to validate? How would you go about designing GPU Assisted Validation for it?

Will a tool (e.g. RenderDoc) be able to trace/replay this extensions?

Are there any API hooks that could be added to improve this (e.g. vkGetBufferOpaqueCaptureAddressKHR)?

This section is for anything that could be beneficial in the final solution, but may not be necessary to address the core problem.
Subsections here will be like those in section 3 (Proposal) but offer additional background as to what peripheral problem they address, or benefit they provide.
Writing this section is a good chance to re-evaluate if anything can or should be moved from section 3 to here, or just outright removed.
