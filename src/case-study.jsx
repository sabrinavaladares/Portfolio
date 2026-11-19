            </p>
            <p style={{ color: "#555", fontSize: isMobile ? 16 : 18, lineHeight: 1.7, marginBottom: 24 }}>
              I was also the first person to build a UI system on the project, before we eventually hired someone dedicated to it. Then came the migration from XD to Figma — which became the moment I understood why we had to do things differently. The product was getting more complex, the inconsistencies were growing, and the way we were working couldn't scale.
            </p>
            <p style={{ color: "#555", fontSize: isMobile ? 16 : 18, lineHeight: 1.7, marginBottom: 0 }}>
              That's how the Business Pattern Library was born. Building it while still producing designs, explaining its value to the team, taking real risks and responsibilities, and keeping clarity through all of it — these were intense phases, each with their own lessons. Together, they taught me what it really takes to redesign a back-end as complex as GraphTalk: not just good design, but the patience to build the systems that make good design possible.
            </p>
          </div>
        </div>

        <CSDivider />

        {/* 05 Appreciations */}
        <div id="testimonials">
          <SectionLabel num="05">Appreciations</SectionLabel>
          <SectionTitle>What the Team Says</SectionTitle>
          <div style={{ marginTop: 24, background: C.bgAlt, borderRadius: 16, padding: isMobile ? "20px" : "32px" }}>
            <div
              id="testimonial-cards"
              style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0 16px" }}
            >
              {[
                [
                  { name: "Christele Brunesseaux", role: "Principal Solution Architect", text: (<>
                    {"Gaining experience and maturity in the project, Sabrina became central & instrumental to the product. "}
                    <span style={{ fontWeight: 600 }}>Combining deep &amp; precise analysis with sharp &amp; efficient designs</span>
                    {", she is leading the Design of the application very proactively."}
                  </>) },
                  { name: "Carol De Block", role: "UX Designer", text: (<>
                    <span style={{ fontWeight: 600 }}>Her design sets the standard for the team.</span>
                    {" She does the research and analysis very thoroughly. When presenting her designs, you notice that "}
                    <span style={{ fontWeight: 600 }}>she is very passionate and dedicated.</span>
                    {" I love to work with Sabrina, because she is always professional about the design work."}
                  </>) },
                  { name: "Nikolay", role: "UI Designer", text: (<>
                    {"Sabrina has profound knowledge in the GraphTalk project's inner concepts, flows and processes. As well, "}
                    <span style={{ fontWeight: 600 }}>she has great attention to detail</span>
                    {", always able to spot and help with resolving an issue to the finest aspect. Her project deliveries are top-notch and perfected."}
                  </>) },
                  { name: "José Avila", role: "P&C Business Expert", text: (<>
                    {"My experience working with Sabrina has been very positive. One of the things I appreciate most is her "}
                    <span style={{ fontWeight: 600 }}>collaborative mindset and solution-oriented approach</span>
                    {". She communicates clearly, engages constructively in discussions, and contributes to creating a productive working environment. I especially value her "}
                    <span style={{ fontWeight: 600 }}>reliability, professionalism, and openness to collaboration</span>
                    {". I look forward to continuing working with her."}
                  </>) },
                  { name: "Julien Lhost", role: "Solution Architecture", text: (<>
                    {"Sabrina took the time to "}
                    <span style={{ fontWeight: 600 }}>understand how the activities and processes work</span>
                    {", which helped ensure that the UX design was grounded in the functional context. I particularly appreciated that she "}
                    <span style={{ fontWeight: 600 }}>explained the rationale behind design choices</span>
                    {", including UX/UI considerations and rationalization decisions."}
                  </>) },
                  { name: "Jean François Mouffle", role: "Principal Solution Architect", text: (<>
                    {"It's a real pleasure to work with Sabrina, as she's always eager to learn about the Insurance business as well as the existing GT UI. "}
                    <span style={{ fontWeight: 600 }}>She always takes the time to understand what the business needs and to find the best proposition</span>
                    {" for the new UI."}
                  </>) },
                ],
                [
                  { name: "Matthieu Lenoble", role: "Project Manager", text: (<>
                    {"I appreciated the lead you took on Design System creation. It was a real challenge, a huge amount of work, and "}
                    <span style={{ fontWeight: 600 }}>you succeeded in creating a tool that allows us to provide consistent design</span>
                    {" to our main client. With the Design System you became a hub for all design decisions."}
                  </>) },
                  { name: "Petya Dimitrova", role: "Manager Solution Architecture", text: (<>
                    <span style={{ fontWeight: 600 }}>Sabrina is the backbone of the Design team.</span>
                    {" "}
                    <span style={{ fontWeight: 600 }}>She is always ready to propose a solution even for complex tasks.</span>
                    {" Her ideas are priceless. Her work ethic is absolutely inspiring, and it's clear that "}
                    <span style={{ fontWeight: 600 }}>she always puts 200% into everything she does.</span>
                  </>) },
                ],
              ][testimonialPage].map((testimonial) => (
                <div key={testimonial.name} style={{ width: isMobile ? "100%" : "calc((100% - 32px) / 3)", minWidth: 0 }}>
                  <TestimonialCard {...testimonial} />
                </div>
              ))}
            </div>
            <div role="group" aria-label="Testimonial pages" style={{ display: "flex", justifyContent: "center", gap: 4 }}>
              {[0, 1].map((page) => (
                <button
                  key={page}
                  type="button"
                  aria-label={`Show testimonial page ${page + 1} of 2`}
                  aria-controls="testimonial-cards"
                  aria-pressed={testimonialPage === page}
                  onClick={() => setTestimonialPage(page)}
                  style={{ display: "grid", placeItems: "center", width: 32, height: 32, padding: 0, border: 0, background: "transparent", cursor: "pointer" }}
                >
                  <span aria-hidden="true" style={{ width: 9, height: 9, borderRadius: "50%", background: testimonialPage === page ? "#4a3a8a" : "#b7aace" }} />
                </button>
              ))}
            </div>
          </div>
        </div>
 
        {/* Next case study */}
        <NextCaseStudyCard setPage={setPage} currentPage="pathfinder" />

        {/* Back to top */}  
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{
              background: "transparent",
              border: "1px solid " + C.border,
              borderRadius: 50,
              padding: "12px 22px",
              fontSize: 13,
              fontWeight: 500,
              color: C.muted,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "sans-serif",
              letterSpacing: 0.2,
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.lilacBorder; e.currentTarget.style.color = C.ink; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.muted; }}
            aria-label="Back to top"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>
            Back to top
          </button>
        </div>

      </div>
    </div>
  );
}
