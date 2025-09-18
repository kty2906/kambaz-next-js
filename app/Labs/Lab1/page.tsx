"use client";
import Image from 'next/image';
export default function Lab1() {
  return (
    <div id="wd-lab1">
      <h2>Lab 1</h2>
      <h3>HTML Examples</h3>

      <div id="wd-h-tag">
        <h4>Heading Tags</h4>
        <p>
          Text documents are often broken up into several sections and subsections...
        </p>
      </div>

      <div id="wd-p-tag">
        <h4>Paragraph Tag</h4>
        <p id="wd-p-1">This is a paragraph. We often separate a long set of sentences with vertical spaces to make reading easier.</p>
        <p id="wd-p-2">This is the second paragraph. It demonstrates separate paragraphs.</p>
        <p id="wd-p-3">This is the third paragraph. Wrap each paragraph with &lt;p&gt; tags.</p>
      </div>

      <div id="wd-lists">
        <h4>List Tags</h4>
        <h5>Ordered List Tag</h5>
        <p>How to make pancakes:</p>
        <ol id="wd-pancakes">
          <li>Mix dry ingredients.</li>
          <li>Add wet ingredients.</li>
          <li>Stir to combine.</li>
          <li>Heat skillet.</li>
          <li>Pour batter and cook.</li>
        </ol>

        <p>My favorite recipe:</p>
        <ol id="wd-your-favorite-recipe">
          <li>Preheat oven to 180°C.</li>
          <li>Mix flour, eggs, milk.</li>
          <li>Bake for 30 minutes.</li>
        </ol>

        <h5>Unordered List Tag</h5>
        <p>My favorite books (in no particular order)</p>
        <ul id="wd-my-books">
          <li>Dune</li>
          <li>Lord of the Rings</li>
          <li>Ender Game</li>
        </ul>

        <p>Your favorite books (in no particular order)</p>
        <ul id="wd-your-books">
          <li>Book A</li>
          <li>Book B</li>
          <li>Book C</li>
        </ul>
      </div>

      <div id="wd-tables">
        <h4>Table Tag</h4>
        <table border={1} width="100%">
          <thead>
            <tr><th>Quiz</th><th>Topic</th><th>Date</th><th>Grade</th></tr>
          </thead>
          <tbody>
            <tr><td>Q1</td><td>HTML</td><td>2025-02-03</td><td>85</td></tr>
            <tr><td>Q2</td><td>CSS</td><td>2025-02-10</td><td>90</td></tr>
            <tr><td>Q3</td><td>JavaScript</td><td>2025-02-17</td><td>95</td></tr>
            <tr><td>Q4</td><td>React</td><td>2025-02-24</td><td>88</td></tr>
            <tr><td>Q5</td><td>Next.js</td><td>2025-03-03</td><td>92</td></tr>
            <tr><td>Q6</td><td>Node</td><td>2025-03-10</td><td>87</td></tr>
            <tr><td>Q7</td><td>APIs</td><td>2025-03-17</td><td>93</td></tr>
            <tr><td>Q8</td><td>Databases</td><td>2025-03-24</td><td>90</td></tr>
            <tr><td>Q9</td><td>Testing</td><td>2025-03-31</td><td>89</td></tr>
            <tr><td>Q10</td><td>Deployment</td><td>2025-04-07</td><td>94</td></tr>
          </tbody>
          <tfoot>
            <tr><td colSpan={3}>Average</td><td>90</td></tr>
          </tfoot>
        </table>
      </div>

      <div id="wd-images">
        <h4>Image tag</h4>
        <p>Loading an image from the internet:</p>
        <img id="wd-starship" width="400px" src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg" alt="starship"/>
       
      </div>

      <div id="wd-forms">
        <h4>Form Elements</h4>
        <form id="wd-text-fields">
          <h5>Text Fields</h5>

          <label htmlFor="wd-text-fields-username">Username:</label>
          <input placeholder="jdoe" id="wd-text-fields-username" /><br/>

          <label htmlFor="wd-text-fields-password">Password:</label>
          <input type="password" defaultValue="123@#$asd" id="wd-text-fields-password" /><br/>

          <label htmlFor="wd-text-fields-first-name">First name:</label>
          <input type="text" title="John" id="wd-text-fields-first-name" /><br/>

          <label htmlFor="wd-text-fields-last-name">Last name:</label>
          <input type="text" placeholder="Doe" defaultValue="Wonderland" id="wd-text-fields-last-name" /><br/>

          <h5>Textarea</h5>
          <label htmlFor="wd-textarea">Biography:</label><br/>
         
          <textarea id="wd-textarea" cols={30} rows={6} defaultValue="web dev assignment" />
<br/>

          <h5 id="wd-buttons">Buttons</h5>
          <button type="button" id="wd-all-good" onClick={() => alert('Life is Good!')}>Hello World!</button><br/>

          <h5 id="wd-radio-buttons">Radio buttons</h5>
          <input type="radio" name="radio-genre" id="wd-radio-comedy" value="COMEDY"/>
          <label htmlFor="wd-radio-comedy">Comedy</label><br/>
          <input type="radio" name="radio-genre" id="wd-radio-drama" value="DRAMA"/>
          <label htmlFor="wd-radio-drama">Drama</label><br/>
          <input type="radio" name="radio-genre" id="wd-radio-scifi" value="SCIFI" defaultChecked/>
          <label htmlFor="wd-radio-scifi">Science Fiction</label><br/>
          <input type="radio" name="radio-genre" id="wd-radio-fantasy" value="FANTASY"/>
          <label htmlFor="wd-radio-fantasy">Fantasy</label><br/>

          <h5 id="wd-checkboxes">Checkboxes</h5>
          <input type="checkbox" id="wd-chkbox-comedy" name="check-genre" />
          <label htmlFor="wd-chkbox-comedy">Comedy</label><br/>
          <input type="checkbox" id="wd-chkbox-drama" name="check-genre" defaultChecked/>
          <label htmlFor="wd-chkbox-drama">Drama</label><br/>
          <input type="checkbox" id="wd-chkbox-scifi" name="check-genre" />
          <label htmlFor="wd-chkbox-scifi">Science Fiction</label><br/>
          <input type="checkbox" id="wd-chkbox-fantasy" name="check-genre" />
          <label htmlFor="wd-chkbox-fantasy">Fantasy</label><br/>

          <h5 id="wd-dropdowns">Dropdowns</h5>
          <label htmlFor="wd-select-one-genre">Favorite movie genre:</label><br/>
          <select id="wd-select-one-genre" defaultValue="SCIFI">
            <option value="COMEDY">Comedy</option>
            <option value="DRAMA">Drama</option>
            <option value="SCIFI">Science Fiction</option>
            <option value="FANTASY">Fantasy</option>
          </select><br/>

          <label htmlFor="wd-select-many-genre">Favorite movie genres:</label><br/>
          <label htmlFor="wd-select-many-genre">Favorite movie genres:</label><br/>
<select id="wd-select-many-genre" multiple defaultValue={["COMEDY", "SCIFI"]}>
  <option value="COMEDY">Comedy</option>
  <option value="DRAMA">Drama</option>
  <option value="SCIFI">Science Fiction</option>
  <option value="FANTASY">Fantasy</option>
</select>


          <h5>Other field types</h5>
          <label htmlFor="wd-text-fields-email">Email:</label>
          <input type="email" placeholder="jdoe@somewhere.com" id="wd-text-fields-email"/><br/>

          <label htmlFor="wd-text-fields-salary-start">Starting salary:</label>
          <input type="number" defaultValue={100000} id="wd-text-fields-salary-start"/><br/>

          <label htmlFor="wd-text-fields-rating">Rating:</label>
          <input type="range" defaultValue={4} max={5} id="wd-text-fields-rating"/><br/>

          <label htmlFor="wd-text-fields-dob">Date of birth:</label>
          <input type="date" defaultValue="2000-01-21" id="wd-text-fields-dob"/><br/>
        </form>
      </div>

      <div id="wd-anchors">
        <h4>Anchor tag</h4>
    
        <p>My repo: <a id="wd-github" href="https://github.com/YOUR_USERNAME/YOUR_REPO" target="_blank" rel="noreferrer">GitHub Repository</a></p>
      </div>
    </div>
  );
}
